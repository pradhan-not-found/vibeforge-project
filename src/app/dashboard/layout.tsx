'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Shield, ShieldAlert, BookOpen, Settings, Menu, X } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from '@/context/AuthContext';

const navSections = [
  {
    label: "Monitoring",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { title: "Audit Logs", path: "/dashboard/logs", icon: BookOpen },
    ],
  },
  {
    label: "Assets",
    items: [
      { title: "Agents", path: "/dashboard/agents", icon: LayoutDashboard },
    ],
  },
  {
    label: "Security",
    items: [
      { title: "Policies", path: "/dashboard/policies", icon: Shield },
      { title: "Threats", path: "/dashboard/threats", icon: ShieldAlert },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, avatar: string | null}>({
    name: 'Admin User',
    email: 'admin@checkpost.app',
    avatar: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'Admin User',
          email: currentUser.email || 'admin@checkpost.app',
          avatar: currentUser.photoURL || null
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const gradientClass = "from-cyan-500/[0.06] via-transparent to-blue-500/[0.05] dark:from-cyan-900/10 dark:to-blue-950/10";

  return (
    <AuthProvider>
    <div className="flex h-screen bg-[var(--app-canvas)] text-[var(--app-ink)] antialiased overflow-hidden">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Always visible */}
      <aside className="relative w-64 h-full shrink-0 border-r border-[var(--app-hairline)] bg-[var(--app-canvas)] flex flex-col z-20">
        <div className="py-5 px-6 border-b border-[var(--app-hairline)] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col leading-[1.1]">
              <span
                className="text-[26px] text-[var(--app-ink)] tracking-tight"
                style={{
                  fontFamily: "var(--font-geist-pixel-grid, monospace)",
                  fontWeight: "bold",
                }}
              >
                Checkpost
              </span>
              <span className="text-[11px] text-[var(--app-muted)] tracking-tighter font-medium mt-1 uppercase">
                AI Agent Firewall
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 gap-5 flex flex-col">
          {navSections.map((section) => (
            <div key={section.label} className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider text-[var(--app-muted)] px-2 py-1 mb-1">
                {section.label}
              </span>
              <nav className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                  return (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium tracking-tight ${
                        isActive 
                          ? 'bg-[var(--app-ink)] text-[var(--app-canvas)] hover:bg-[var(--app-ink)]' 
                          : 'text-[var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[var(--app-ink)]'
                      }`}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 pb-4 px-4">
          <div className="group flex items-center gap-3 rounded-xl p-2.5 border border-[var(--app-hairline)] bg-[var(--app-soft)] w-full">
            <div className="size-9 rounded-full bg-[var(--app-ink)] flex items-center justify-center shrink-0 overflow-hidden">
              <span className="text-xs font-semibold text-[var(--app-canvas)]">
                {user.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--app-ink)] truncate">{user.name}</p>
              <p className="text-[11px] text-[var(--app-muted)] truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-16rem)] h-screen overflow-hidden bg-[var(--app-canvas)]">
        {/* Ambient accent backdrop tone */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} pointer-events-none z-0`} />
        {/* Fine noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-[var(--app-hairline)] bg-[var(--app-canvas)]/85 backdrop-blur-md px-3 sm:px-4">
          <div className="flex items-center gap-2">
            <button 
              className="lg:hidden text-[var(--app-muted)] hover:text-[var(--app-ink)] p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              <span 
                className="text-xl text-[var(--app-ink)] tracking-tight"
                style={{
                  fontFamily: "var(--font-geist-pixel-grid, monospace)",
                  fontWeight: "bold",
                }}
              >
                Checkpost
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative z-10 w-full min-h-[calc(100svh-3.5rem)]">
          {children}
        </main>
      </div>
    </div>
    </AuthProvider>
  );
}
