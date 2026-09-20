'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('navToDashboard', 'true');
      } catch (e) {}
      router.replace('/?tab=dashboard');
    }
  }, [router]);



  return null;
}


