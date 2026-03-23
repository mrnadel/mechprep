'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, Users, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserSearch from '@/components/friends/UserSearch';
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
    isLoading: friendsLoading,
    mutate: mutateFriends,
  } = useSWR('/api/friends', fetcher);

  const {
    data: requestsData,
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

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <header
        className="sticky top-0 z-10 bg-white px-4 sm:px-5 py-3"
        style={{ borderBottom: '2px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[10px] active:scale-90 transition-transform lg:hidden"
            style={{ background: '#F0F0F0' }}
          >
            <ChevronLeft style={{ width: 20, height: 20, color: '#3C3C3C' }} />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold" style={{ color: '#3C3C3C' }}>Friends</h1>
            <p className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>Study together, grow together</p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-5 py-5 max-w-[600px] mx-auto">
        <UserSearch />

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('friends')}
            className={`flex-1 min-h-[44px] py-2.5 rounded-xl text-sm font-bold transition-colors ${
              tab === 'friends'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            Friends {friends.length > 0 && `(${friends.length})`}
          </button>
          <button
            onClick={() => setTab('requests')}
            className={`flex-1 min-h-[44px] py-2.5 rounded-xl text-sm font-bold transition-colors relative ${
              tab === 'requests'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            Requests
            {incoming.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
              >
                {incoming.length}
              </span>
            )}
          </button>
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
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
                </div>
              ) : friends.length === 0 ? (
                <div className="card p-8 text-center" style={{ background: '#EEF2FF', borderColor: '#C7D2FE' }}>
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary-500" />
                    </div>
                  </div>
                  <p className="text-surface-700 font-bold text-sm mb-1">No friends yet</p>
                  <p className="text-surface-400 text-xs mb-4">
                    Challenge friends to see who can master thermodynamics first!
                  </p>
                  <button
                    onClick={() => {
                      const input = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
                      input?.focus();
                    }}
                    className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Find Friends
                  </button>
                </div>
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
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
                </div>
              ) : incoming.length === 0 && outgoing.length === 0 ? (
                <div className="card p-8 text-center" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
                  <div className="flex justify-center mb-3">
                    <span className="text-3xl">✅</span>
                  </div>
                  <p className="text-surface-700 font-bold text-sm">All caught up!</p>
                  <p className="text-surface-400 text-xs mt-1">No pending requests</p>
                </div>
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
