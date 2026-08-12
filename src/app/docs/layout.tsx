"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Introduction', path: '/docs' },
    { name: 'Deterministic Policy Engine', path: '/docs/deterministic-policy-engine' },
    { name: 'Cost Governance', path: '/docs/cost-governance' },
    { name: 'Human-in-the-Loop', path: '/docs/hitl' },
    { name: 'Enterprise Ready', path: '/docs/enterprise-ready' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-[#F9FAFB] border-r border-gray-200 p-6 flex flex-col md:min-h-screen">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-4">How to use Checkpost<br/>WAF for AI Agents</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#2D2D2D] hover:bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Try in Dashboard &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 mt-4 px-2">(I) Core Architecture</h3>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'text-blue-600 bg-blue-50/50 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'}`}
              >
                <div className={`w-2 h-2 rounded-full border-2 ${isActive ? 'border-blue-400 bg-blue-400' : 'border-gray-300'}`} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto p-8 md:p-12 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
