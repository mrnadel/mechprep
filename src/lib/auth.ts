import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, accounts } from './db/schema';
import { isLoginLocked, trackFailedLogin, clearFailedLogins } from './rate-limit';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase();
        const password = credentials.password as string;

        // Check if account is locked from too many failed attempts
        if (isLoginLocked(email)) {
          return null;
        }

        const result = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
            image: users.image,
            displayName: users.displayName,
            passwordHash: users.passwordHash,
          })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (result.length === 0) {
          trackFailedLogin(email);
          return null;
        }

        const user = result[0];
        if (!user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          trackFailedLogin(email);
          return null;
        }

        // Successful login — clear failed attempts
        clearFailedLogins(email);

        return {
          id: user.id,
          email: user.email,
          name: user.displayName || user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === 'update') {
        if (session?.name) token.name = session.name;
        if (session?.image !== undefined) token.picture = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.name) {
        session.user.name = token.name;
      }
      if (token.picture !== undefined) {
        session.user.image = (token.picture as string) || undefined;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Set joinedDate for OAuth users auto-created by the adapter
      if (user.id) {
        await db
          .update(users)
          .set({
            joinedDate: new Date().toISOString().split('T')[0],
            displayName: user.name || 'Engineer',
          })
          .where(eq(users.id, user.id));
      }
    },
  },
});
