'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{name: string, email: string, avatar: string | null}>({
    name: 'John Doe',
    email: 'john@acmecorp.com',
    avatar: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'User',
          email: currentUser.email || 'user@example.com',
          avatar: currentUser.photoURL || null
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Helper to get initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-surface font-[family-name:var(--font-neoris)] flex text-ink">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-card bg-surface-raised flex flex-col justify-between">
        <div className="p-6">
          <Link href="/" className="inline-flex items-center mb-8">
            <span className="text-ink" style={{ fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold", fontSize: "1.25rem" }}>Checkpost</span>
          </Link>

          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] text-[14px] font-medium transition-colors">
              Overview
            </Link>
            <Link href="/dashboard/agents" className="px-3 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] text-[14px] font-medium transition-colors">
              Agents
            </Link>
            <Link href="/dashboard/policies" className="px-3 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] text-[14px] font-medium transition-colors">
              Policies Engine
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-border-card">
          <Link href="/dashboard/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-bold text-xs">
                {getInitials(user.name)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[14px] font-medium truncate w-32">{user.name}</span>
              <span className="text-[12px] text-ink-muted truncate w-32">Company Admin</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-surface">
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
