'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Users, 
  Search, 
  FileText,
  Activity
} from 'lucide-react';
import { scrollToTarget } from '@/components/layout/SmoothScroll';

interface NavbarProps {
  hideLogo?: boolean;
  forceDashboardActive?: boolean;
}

export function Navbar({ 
  hideLogo = false, 
  forceDashboardActive = false
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/#dashboard', icon: Briefcase },
    { label: 'Roles', href: '/roles', icon: FileText },
    { label: 'Candidates', href: '/candidates', icon: Users },
    { label: 'NL Search', href: '/search', icon: Search },
    { label: 'Audit Trail', href: '/audit', icon: Activity }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-300/80 bg-[#f3f2f2]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand or Spacer when fixed logo is active */}
        <div className="flex items-center gap-6 sm:gap-8">
          {hideLogo ? (
            <div className="w-36 sm:w-48 shrink-0" aria-hidden="true" />
          ) : (
            <Link href="/" className="flex items-center gap-3 group cursor-pointer" title="Return to 3D Landing Page">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B30] inline-block animate-ping" />
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-base tracking-[0.18em] uppercase text-[#0F0F0F] group-hover:opacity-75 transition-opacity">
                  HIREFLOW
                </span>
                <span className="hidden sm:inline-block text-[10px] text-neutral-500 font-mono pl-2 border-l border-neutral-300">
                  OS 3.4v
                </span>
              </div>
            </Link>
          )}

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isDashboard = item.href === '/#dashboard';
              const isActive = isDashboard 
                ? forceDashboardActive || pathname === '/dashboard'
                : pathname === item.href || (item.href !== '/#dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (isDashboard) {
                      e.preventDefault();
                      if (pathname === '/') {
                        scrollToTarget('#dashboard', { duration: 1.2 });
                      } else {
                        if (typeof window !== 'undefined') {
                          try {
                            sessionStorage.setItem('navToDashboard', 'true');
                          } catch (err) {}
                        }
                        router.push('/?tab=dashboard');
                      }
                    }
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all shrink-0 ${
                    isActive 
                      ? 'bg-[#0F0F0F] text-white shadow-xs'
                      : 'text-neutral-600 hover:bg-neutral-200/80 hover:text-black'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Recruiter Profile on the right (3D Core and Human Invariance removed per request) */}
        <div className="flex items-center gap-2 border-l border-neutral-300 pl-4 shrink-0">
          <div className="h-7 w-7 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-[10px] font-mono font-bold">
            AT
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-[#0F0F0F]">Alex Thorne</span>
        </div>
      </div>
    </header>
  );
}

