'use client';

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function getPageRank(path: string): number {
  if (!path || path === '/') return 0;
  if (path.startsWith('/roles/')) return 15;
  if (path === '/roles') return 10;
  if (path.startsWith('/candidates/')) return 25;
  if (path === '/candidates') return 20;
  if (path.startsWith('/search')) return 30;
  if (path.startsWith('/audit')) return 40;
  if (path.startsWith('/dashboard')) return 5;
  return 20;
}

interface PageTransitionCtx {
  navigate: (href: string, explicitDirection?: 'forward' | 'backward') => void;
}

const PageTransitionContext = createContext<PageTransitionCtx>({
  navigate: (href) => {
    if (typeof window !== 'undefined') window.location.href = href;
  },
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback(
    (href: string, explicitDirection?: 'forward' | 'backward') => {
      if (typeof window === 'undefined') return;
      const targetPath = href.split('?')[0].split('#')[0];
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) return;

      const fromRank = getPageRank(currentPath);
      const toRank   = getPageRank(targetPath);
      const direction = explicitDirection ?? (toRank >= fromRank ? 'forward' : 'backward');
      try {
        sessionStorage.setItem('slideDirection', direction);
        sessionStorage.setItem('lastPathname', currentPath);
      } catch {}

      router.push(href);
    },
    [router]
  );

  // Global click listener for ANY link/anchor in the document:
  // Catches all internal links (roles cards, candidate cards, breadcrumbs, etc.)
  // and computes the slide direction BEFORE Next.js navigates
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('#')) return;

      const targetPath = href.split('?')[0].split('#')[0];
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) return;

      const fromRank = getPageRank(currentPath);
      const toRank   = getPageRank(targetPath);
      const direction = toRank >= fromRank ? 'forward' : 'backward';
      try {
        sessionStorage.setItem('slideDirection', direction);
        sessionStorage.setItem('lastPathname', currentPath);
      } catch {}
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
    </PageTransitionContext.Provider>
  );
}