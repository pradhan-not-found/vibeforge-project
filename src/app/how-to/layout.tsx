'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CHAPTERS = [
  {
    id: 'start',
    numeral: 'I',
    title: 'How to start',
    sections: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'setup', label: 'Setup your workspace' },
    ]
  },
  {
    id: 'secure',
    numeral: 'II',
    title: 'How to secure',
    sections: [
      { id: 'proxy', label: 'API Key Proxies' },
      { id: 'threats', label: 'Threat Detection' },
    ]
  },
  {
    id: 'monitor',
    numeral: 'III',
    title: 'How to monitor',
    sections: [
      { id: 'logs', label: 'Agent Logging' },
      { id: 'analytics', label: 'Usage Analytics' },
    ]
  },
  {
    id: 'scale',
    numeral: 'IV',
    title: 'How to scale',
    sections: [
      { id: 'ratelimits', label: 'Rate Limiting' },
      { id: 'policies', label: 'Custom Policies' },
    ]
  }
];

export default function HowToLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to determine if a chapter is active based on the current path
  const isChapterActive = (chapterId: string) => pathname.includes(`/how-to/${chapterId}`);
  
  // Note: we are mapping section active state purely visually for now based on the chapter, 
  // since all sections might be on one page, or split into different routes.
  // For now, let's assume each chapter is one page, and sections are anchor links.

  return (
    <div className="min-h-screen bg-[#F5F5F2] pt-24 pb-20 px-4 md:px-8 lg:px-12 flex justify-center selection:bg-black selection:text-white">
      <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-start gap-12 lg:gap-24 relative">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 sticky top-28 hidden md:block">
          <div className="mb-10">
            <h3 className="text-[var(--app-muted)] text-sm font-medium mb-3">
              How to run secure agents<br />with Checkpost
            </h3>
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
            >
              Try in Checkpost <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <nav className="flex flex-col gap-8">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="flex flex-col gap-3">
                <Link 
                  href={`/how-to/${chapter.id}`}
                  className={`text-sm font-semibold flex items-center gap-2 ${isChapterActive(chapter.id) ? 'text-black' : 'text-[#8A8A8A] hover:text-black transition-colors'}`}
                >
                  <span className="font-mono text-xs opacity-70">({chapter.numeral})</span>
                  {chapter.title}
                </Link>
                
                {isChapterActive(chapter.id) && (
                  <div className="flex flex-col gap-2.5 ml-6 border-l border-black/10 pl-4 py-1">
                    {chapter.sections.map(section => (
                      <Link
                        key={section.id}
                        href={`/how-to/${chapter.id}#${section.id}`}
                        className="text-sm text-[#5B5B5B] hover:text-black transition-colors flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full border border-[#5B5B5B]/30" />
                        {section.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-[700px]">
          {children}
        </main>
      </div>
    </div>
  );
}
