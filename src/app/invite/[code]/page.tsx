import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { auth } from '@/lib/auth';
import InviteClient from './InviteClient';

export const metadata: Metadata = {
  title: 'You\'ve Been Invited to MechReady',
  description: 'A friend invited you to join MechReady — the gamified learning platform for mastering any profession.',
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ code: string }>;
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params;

  const [inviter] = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      image: users.image,
    })
    .from(users)
    .where(eq(users.inviteCode, code))
    .limit(1);

  if (!inviter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">🔗</p>
          <h1 className="text-xl font-extrabold text-surface-800 mb-2">Invalid Invite Link</h1>
          <p className="text-sm text-surface-500 mb-6">This link may have expired or been regenerated.</p>
          <a href="/register" className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors">
            Sign Up Anyway
          </a>
        </div>
      </div>
    );
  }

  const session = await auth();
  const loggedIn = !!session?.user?.id;
  const isSelf = session?.user?.id === inviter.id;

  return (
    <InviteClient
      inviterName={inviter.displayName ?? 'A friend'}
      inviterImage={inviter.image}
      inviteCode={code}
      loggedIn={loggedIn}
      isSelf={isSelf}
    />
  );
}
