import Link from 'next/link';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface font-[family-name:var(--font-neoris)] flex text-ink">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-card bg-surface-raised flex flex-col justify-between">
        <div className="p-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-6 rounded bg-lime-300 border border-[rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
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
            <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-bold text-xs">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-medium">John Doe</span>
              <span className="text-[12px] text-ink-muted">Company Admin</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-surface">
        <header className="h-16 border-b border-border-card flex items-center justify-between px-8 shrink-0">
          <div className="font-medium text-[15px]">WAF Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[13px] text-ink-muted font-medium">System Operational</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
