'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LayoutDashboard, Shield, Bot, Settings, UserCircle, LogOut, Sparkles, Activity } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Agents', href: '/dashboard/agents', icon: Bot },
    { name: 'Policies Engine', href: '/dashboard/policies', icon: Shield },
    { name: 'Observability', href: '/dashboard/observability', icon: Activity },
    { name: 'Test LLM', href: '/dashboard/llm-test', icon: Sparkles },
  ];

  return (
    <div className="h-screen flex bg-[#FDFDFB] text-[#1A1A1A] antialiased overflow-hidden" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>
      
      {/* Sidebar */}
      <aside className="w-[260px] flex flex-col justify-between shrink-0 bg-[#FDFDFB] border-r border-[#E5E5E5] z-20">
        
        {/* Top Section */}
        <div className="flex flex-col gap-4 p-4">
          <div className="px-2 py-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-[#1A1A1A]" style={{ fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold", fontSize: "1.25rem" }}>Checkpost</span>
            </Link>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E5E5E5] text-[#1A1A1A] font-semibold' 
                      : 'text-[rgba(38,35,35,0.6)] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#1A1A1A] font-medium'
                  }`}
                >
                  <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#1A1A1A]' : 'text-[rgba(38,35,35,0.5)]'}`} />
                  <span className="text-[14px] tracking-tight">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 pb-6 flex flex-col gap-1 border-t border-[#E5E5E5]">
          <Link 
            href="/dashboard/profile" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              pathname === '/dashboard/profile'
                ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E5E5E5] text-[#1A1A1A] font-semibold' 
                : 'text-[rgba(38,35,35,0.6)] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#1A1A1A] font-medium'
            }`}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-[22px] h-[22px] rounded-full object-cover shrink-0" />
            ) : (
              <UserCircle className="w-[18px] h-[18px]" />
            )}
            <span className="text-[14px] tracking-tight">Profile</span>
          </Link>
          <button 
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[rgba(38,35,35,0.6)] hover:bg-[rgba(224,82,82,0.1)] hover:text-[#e05252] font-medium transition-all duration-200 text-left"
            onClick={() => auth.signOut()}
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="text-[14px] tracking-tight">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col min-h-0 overflow-y-auto bg-[#FDFDFB]">
        <div className="p-6 sm:p-8 lg:p-10 max-w-[1200px] w-full mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
