"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CHAPTERS = [
  { id: 'deterministic-policy-engine', title: 'The Deterministic Policy Engine (The Rulebook)', chapter: 'Chapter I' },
  { id: 'cost-governance', title: 'Cost Governance and Loop Protection', chapter: 'Chapter II' },
  { id: 'hitl', title: 'Human-in-the-Loop (HITL) Interruption', chapter: 'Chapter III' },
  { id: 'enterprise-ready', title: 'Enterprise Ready & Secure', chapter: 'Chapter IV' },
];

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col font-sans text-[#262323]">
      {/* Top Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-medium text-gray-600 hover:text-black transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Checkpost
          </Link>
        </div>
        <div className="text-xs font-mono tracking-wider text-gray-400 uppercase">
          Architecture Guide
        </div>
      </header>
      
      {/* Main Layout Area */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-[320px] shrink-0 border-r border-gray-200/50 p-6 md:py-12 md:px-8 bg-[#FAFAF7]/50 md:sticky md:top-[65px] md:h-[calc(100vh-65px)] overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8 font-mono">Index</h3>
          <nav className="flex flex-col gap-6">
            {CHAPTERS.map((chap) => {
              const isActive = pathname.includes(chap.id);
              return (
                <Link key={chap.id} href={`/chapter/${chap.id}`} className="group relative">
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute -left-4 top-0 bottom-0 w-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  )}
                  
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-mono mb-1 tracking-wider uppercase transition-colors ${isActive ? 'text-blue-500 font-bold' : 'text-gray-400 group-hover:text-blue-400'}`}>
                      {chap.chapter}
                    </span>
                    <span className={`text-[15px] font-[460] leading-[140%] transition-colors ${isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
                      {chap.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0 bg-white">
          <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20 md:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
