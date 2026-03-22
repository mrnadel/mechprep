'use client';

import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function FriendsBadge() {
  const { data } = useSWR('/api/friends/requests/count', fetcher, {
    refreshInterval: 60000,
  });

  const count = data?.count ?? 0;
  if (count === 0) return null;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1"
    >
      {count > 9 ? '9+' : count}
    </motion.span>
  );
}
