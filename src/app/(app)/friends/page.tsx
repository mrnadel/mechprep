'use client';

import { useState, useCallback } from 'react';
import { Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { TabToggle } from '@/components/ui/TabToggle';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorRetry } from '@/components/ui/ErrorRetry';
import { EmptyState } from '@/components/ui/EmptyState';
import InviteShare from '@/components/friends/InviteShare';
import FriendCard from '@/components/friends/FriendCard';
import FriendRequestCard from '@/components/friends/FriendRequestCard';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Request failed: ${r.status}`);
    return r.json();
  });

export default function FriendsPage() {
  const [tab, setTab] = useState<'friends' | 'requests'>('friends');

  const {
    data: friendsData,
    error: friendsError,
    isLoading: friendsLoading,
    mutate: mutateFriends,
  } = useSWR('/api/friends', fetcher);

  const {
    data: requestsData,
    error: requestsError,
    isLoading: requestsLoading,
    mutate: mutateRequests,
  } = useSWR('/api/friends/requests', fetcher);

  const friends = friendsData?.friends ?? [];
  const incoming = requestsData?.incoming ?? [];
  const outgoing = requestsData?.outgoing ?? [];

  const handleAction = useCallback(() => {
    mutateFriends();
    mutateRequests();
  }, [mutateFriends, mutateRequests]);

  const tabs = [
    { id: 'friends' as const, label: friends.length > 0 ? `Friends (${friends.length})` : 'Friends' },
    { id: 'requests' as const, label: 'Requests', badge: incoming.length },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <PageHeader title="Friends" subtitle="Study together, grow together" />

      <div className="px-3 sm:px-5 py-4 sm:py-5 max-w-[600px] mx-auto">
        <InviteShare />

        <div className="mb-4 sm:mb-5">
          <TabToggle tabs={tabs} activeTab={tab} onChange={setTab} />
        </div>

        <AnimatePresence mode="wait">
          {tab === 'friends' ? (
            <motion.div
              key="friends"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
            >
              {friendsLoading ? (
                <LoadingSpinner card={false} />
              ) : friendsError ? (
                <ErrorRetry title="Failed to load friends" onRetry={() => mutateFriends()} />
              ) : friends.length === 0 ? (
                <EmptyState
                  icon={
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary-500" />
                    </div>
                  }
                  title="No friends yet"
                  subtitle="Share your invite link above to add friends!"
                  bgColor="#EFF6FF"
                  borderColor="#C7D2FE"
                />
              ) : (
                <div className="flex flex-col gap-2">
                  {friends.map((f: any, i: number) => (
                    <FriendCard key={f.id} {...f} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="requests"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              {requestsLoading ? (
                <LoadingSpinner card={false} />
              ) : requestsError ? (
                <ErrorRetry title="Failed to load requests" onRetry={() => mutateRequests()} />
              ) : incoming.length === 0 && outgoing.length === 0 ? (
                <EmptyState
                  icon={<span className="text-3xl">✅</span>}
                  title="All caught up!"
                  subtitle="No pending requests"
                  bgColor="#F0FDF4"
                  borderColor="#BBF7D0"
                />
              ) : (
                <>
                  {incoming.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-3">
                        Incoming ({incoming.length})
                      </h3>
                      <div className="flex flex-col gap-2">
                        {incoming.map((req: any, i: number) => (
                          <FriendRequestCard
                            key={req.id}
                            id={req.id}
                            userId={req.senderId}
                            displayName={req.senderName ?? 'Unknown'}
                            image={req.senderImage}
                            level={req.senderLevel ?? 1}
                            type="incoming"
                            onAction={handleAction}
                            index={i}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {outgoing.length > 0 && (
                    <div>
                      <h3 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-3">
                        Sent ({outgoing.length})
                      </h3>
                      <div className="flex flex-col gap-2">
                        {outgoing.map((req: any, i: number) => (
                          <FriendRequestCard
                            key={req.id}
                            id={req.id}
                            userId={req.receiverId}
                            displayName={req.receiverName ?? 'Unknown'}
                            image={req.receiverImage}
                            level={req.receiverLevel ?? 1}
                            type="outgoing"
                            onAction={handleAction}
                            index={i}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
