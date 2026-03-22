'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, Users, Loader2 } from 'lucide-react';
import UserSearch from '@/components/friends/UserSearch';
import FriendCard from '@/components/friends/FriendCard';
import FriendRequestCard from '@/components/friends/FriendRequestCard';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

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
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      <header
        className="sticky top-0 z-10 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Friends</h1>
        </div>
      </header>

      <div style={{ padding: '20px 20px', maxWidth: 600, margin: '0 auto' }}>
        <UserSearch />

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('friends')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              tab === 'friends'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            Friends {friends.length > 0 && `(${friends.length})`}
          </button>
          <button
            onClick={() => setTab('requests')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors relative ${
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

        {tab === 'friends' && (
          <div>
            {friendsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
              </div>
            ) : friends.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <Users className="w-12 h-12 text-surface-300" />
                <p className="text-surface-400 font-semibold text-sm">
                  Find friends to compete with!
                </p>
                <p className="text-surface-300 text-xs">
                  Search for users above to add them
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {friends.map((f: any) => (
                  <FriendCard key={f.id} {...f} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'requests' && (
          <div>
            {requestsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
              </div>
            ) : incoming.length === 0 && outgoing.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <p className="text-surface-400 font-semibold text-sm">
                  No pending requests
                </p>
              </div>
            ) : (
              <>
                {incoming.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-3">
                      Incoming ({incoming.length})
                    </h3>
                    <div className="flex flex-col gap-2">
                        {incoming.map((req: any) => (
                          <FriendRequestCard
                            key={req.id}
                            id={req.id}
                            userId={req.senderId}
                            displayName={req.senderName ?? 'Unknown'}
                            image={req.senderImage}
                            level={req.senderLevel ?? 1}
                            type="incoming"
                            onAction={handleAction}
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
                        {outgoing.map((req: any) => (
                          <FriendRequestCard
                            key={req.id}
                            id={req.id}
                            userId={req.receiverId}
                            displayName={req.receiverName ?? 'Unknown'}
                            image={req.receiverImage}
                            level={req.receiverLevel ?? 1}
                            type="outgoing"
                            onAction={handleAction}
                          />
                        ))}
                      </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
