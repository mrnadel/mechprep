'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/feedback');
  }, [router]);

  return <p style={{ padding: 40, fontFamily: 'system-ui' }}>Redirecting...</p>;
}
