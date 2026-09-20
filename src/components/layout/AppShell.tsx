'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  if (isLanding) {
    return (
      <div className="min-h-screen w-full bg-[#f3f2f2] wireframe-grid text-[#0F0F0F] selection:bg-[#0F0F0F] selection:text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f2f2] text-[#0F0F0F] wireframe-grid font-sans selection:bg-[#0F0F0F] selection:text-white theme-poppins-pages">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>


      <footer className="border-t border-neutral-300/80 bg-white/70 py-6 text-xs text-neutral-600 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] inline-block animate-ping" />
            <span className="font-bold text-[#0F0F0F]">HIREFLOW OS 3.4v</span>
            <span className="text-neutral-400">•</span>
            <span>Evidence-Backed Intelligence with Complete Audit Trail</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 font-mono text-[11px]">
            <span>SOC2 TYPE-III</span>
            <span>•</span>
            <span>LATENCY: 14ms</span>
            <span>•</span>
            <span>HUMAN SOVEREIGNTY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

