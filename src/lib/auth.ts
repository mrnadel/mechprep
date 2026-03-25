import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, accounts } from './db/schema';
import { isLoginLocked, trackFailedLogin, clearFailedLogins } from './rate-limit';
import { cookies } from 'next/headers';
import { friendships } from './db/schema';
import { sortFriendPair, countFriends } from './db/friends';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, // 30 days
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
    async signIn({ user }) {
      if (user.id) {
        try {
          const cookieStore = await cookies();
          const inviterId = cookieStore.get('invite_ref')?.value;

          if (inviterId && inviterId !== user.id) {
            const [inviterCount, userCount] = await Promise.all([
              countFriends(inviterId),
              countFriends(user.id),
            ]);

            if (inviterCount < 50 && userCount < 50) {
              const [low, high] = sortFriendPair(user.id, inviterId);
              await db.insert(friendships).values({ userId: low, friendId: high }).onConflictDoNothing();
            }

            cookieStore.delete('invite_ref');
          }
        } catch {
          // Non-critical — don't block sign-in
        }
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      // Set joinedDate for OAuth users auto-created by the adapter
      if (user.id) {
        try {
          await db
            .update(users)
            .set({
              joinedDate: new Date().toISOString().split('T')[0],
              displayName: user.name || 'Engineer',
            })
            .where(eq(users.id, user.id));
        } catch (err) {
          console.error('Failed to set joinedDate for new user:', err);
        }
      }
    },
  },
});
