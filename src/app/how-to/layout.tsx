'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const CHAPTERS = [
  {
    id: 'start',
    numeral: 'I',
    title: 'How to start',
    label: 'Start',
    sections: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'setup', label: 'Setup your workspace' },
    ],
  },
  {
    id: 'secure',
    numeral: 'II',
    title: 'How to secure',
    label: 'Secure',
    sections: [
      { id: 'proxy', label: 'API Key Proxies' },
      { id: 'threats', label: 'Threat Detection' },
    ],
  },
  {
    id: 'monitor',
    numeral: 'III',
    title: 'How to monitor',
    label: 'Monitor',
    sections: [
      { id: 'logs', label: 'Agent Logging' },
      { id: 'analytics', label: 'Usage Analytics' },
    ],
  },
  {
    id: 'scale',
    numeral: 'IV',
    title: 'How to scale',
    label: 'Scale',
    sections: [
      { id: 'ratelimits', label: 'Rate Limiting' },
      { id: 'policies', label: 'Custom Policies' },
    ],
  },
];

/* ─── Scroll minimap — vertical tick bar, exactly like cofounder ─── */
function ScrollMinimap() {
  const [scrollPct, setScrollPct] = useState(0);
  const TICK_COUNT = 50;

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? el.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeIdx = scrollPct * (TICK_COUNT - 1);

  return (
    <div
      className="flex flex-col items-end cursor-pointer touch-none"
      style={{ gap: '5px', width: '14px' }}
    >
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const d = Math.abs(i - activeIdx);
        let width = 7;
        let r = 32, g = 32, b = 32, a = 0.16;

        if (d < 4) {
          if (d < 1) {
            const t = d;
            width = 14 * (1 - t) + 12.25 * t;
            r = 0 * (1 - t) + 52 * t;
            g = 176 * (1 - t) + 184 * t;
            b = 255 * (1 - t) + 244 * t;
            a = 1;
          } else if (d < 2) {
            const t = d - 1;
            width = 12.25 * (1 - t) + 8.75 * t;
            r = 52 * (1 - t) + 156 * t;
            g = 184 * (1 - t) + 201 * t;
            b = 244 * (1 - t) + 221 * t;
            a = 1;
          } else if (d < 3) {
            const t = d - 2;
            width = 8.75 * (1 - t) + 7 * t;
            r = 156 * (1 - t) + 208 * t;
            g = 201 * (1 - t) + 209 * t;
            b = 221 * (1 - t) + 210 * t;
            a = 1;
          } else {
            const t = d - 3;
            width = 7;
            r = 208 * (1 - t) + 32 * t;
            g = 209 * (1 - t) + 32 * t;
            b = 210 * (1 - t) + 32 * t;
            a = 1 * (1 - t) + 0.16 * t;
          }
        }

        return (
          <span
            key={i}
            className="shrink-0 rounded-full"
            style={{
              width: `${width}px`,
              height: '2px',
              background: a < 1 ? `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})` : `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
              transition: 'background 120ms linear, width 120ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Divider between nav items ─── */
function NavDivider() {
  return (
    <span className="relative mx-[6px] self-center shrink-0 w-[1px] h-[14px] translate-y-[4px]">
      <span
        className="absolute inset-0"
        style={{ background: 'rgba(32,32,32,0.12)' }}
      />
    </span>
  );
}

export default function HowToLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (id: string) => pathname.includes(`/how-to/${id}`);

  return (
    <div
      className="min-h-screen flex flex-col antialiased selection:bg-black selection:text-white"
      style={{ background: '#F5F5F2' }}
    >
      {/* ── HEADER ── exact clone of cofounder header */}
      <header
        className="site-header fixed top-0 left-0 right-0 z-[201] flex justify-center"
        style={{
          background: '#F5F5F2',
          borderBottom: '1px solid #E8E7E6',
          boxShadow: '0 1px 0 0 #fff',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-[20px] min-[476px]:px-[32px] md:px-[20px] py-[18px] min-[1000px]:py-0 min-[1000px]:pt-[26px] min-[1000px]:pb-[23px] flex items-center justify-between">
          {/* Logo */}
          <Link className="shrink-0 flex items-center" aria-label="Home" href="/">
            <span
              className="text-black transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-geist-pixel-grid, monospace)',
                fontWeight: 'bold',
                fontSize: 'clamp(20px, 2.5vw, 28px)',
              }}
            >
              Checkpost
            </span>
          </Link>

          {/* Desktop nav — empty center, CTA on right */}
          <div className="hidden min-[1000px]:block">
            <nav className="flex items-center gap-3">
              {/* CTA */}
              <Link
                href="/login"
                className="group relative inline-flex items-center justify-center no-underline whitespace-nowrap cursor-pointer h-[41px] px-3 rounded-[8px] w-[130px] bg-[#262323] text-white hover:bg-black transition-colors"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-[6px]">
                  <span className="font-[460] text-[15px] tracking-[0.15px]">
                    Get started
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </nav>
          </div>

          {/* Mobile: just the CTA */}
          <div className="flex items-center min-[1000px]:hidden gap-3">
            <Link
              href="/login"
              className="text-[13px] sm:text-[14px] font-[500] text-black/60 hover:text-black transition-colors px-2 py-1"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#111] text-white px-[12px] py-[8px] rounded-[6px] text-[13px] sm:text-[14px] font-[500] hover:opacity-90 transition-all"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* ── BODY: sidebar + content + minimap ── */}
      <div className="w-full flex-1 pt-[73px] min-[1000px]:pt-[69px] flex justify-center">
        <div className="w-full max-w-[1440px] flex flex-row items-stretch px-0 min-[1000px]:px-[32px] relative">

          {/* LEFT SIDEBAR */}
          <aside className="shrink-0 w-[260px] xl:w-[280px] hidden min-[1000px]:flex flex-col sticky top-[89px] z-10 pt-[40px] pl-[0px] pr-[8px]">

            {/* CTA block */}
            <div className="mb-[28px]">
              <p
                className="text-[13px] leading-[150%] font-[440] mb-[12px]"
                style={{ color: 'rgba(32,32,32,0.50)' }}
              >
                How to run secure agents
                <br />
                with Checkpost
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-[8px] text-white px-[14px] py-[8px] rounded-[8px] text-[13px] font-[500] no-underline transition-colors bg-[#2D2D2D] hover:bg-[#111]"
              >
                Try in Checkpost <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Chapter nav */}
            <nav className="flex flex-col gap-[24px]">
              {CHAPTERS.map((chapter) => {
                const active = isActive(chapter.id);
                return (
                  <div key={chapter.id} className="flex flex-col gap-[10px]">
                    {/* Chapter title */}
                    <Link
                      href={`/how-to/${chapter.id}`}
                      className="flex items-center gap-[12px] no-underline group"
                    >
                      <span
                        className="font-mono text-[12px] shrink-0 transition-colors duration-150"
                        style={{ color: active ? 'rgba(32,32,32,0.55)' : 'rgba(32,32,32,0.28)' }}
                      >
                        ({chapter.numeral})
                      </span>
                      <span
                        className="text-[14px] leading-[140%] font-[520] transition-colors duration-150 group-hover:text-[#111]"
                        style={{ color: active ? '#111' : 'rgba(32,32,32,0.48)' }}
                      >
                        {chapter.title}
                      </span>
                    </Link>

                    {/* Sub-sections — only rendered when active */}
                    {active && (
                      <div className="flex flex-col gap-[8px] ml-[28px]">
                        {chapter.sections.map((sec) => (
                          <Link
                            key={sec.id}
                            href={`/how-to/${chapter.id}#${sec.id}`}
                            className="flex items-center gap-[12px] no-underline group transition-colors duration-150"
                            style={{ color: '#5B5B5B' }}
                          >
                            {/* Hollow circle dot — professional size matching cofounder */}
                            <span
                              className="w-[11px] h-[11px] rounded-full shrink-0 transition-all duration-150"
                              style={{
                                border: '1.5px solid rgba(32,32,32,0.3)',
                              }}
                            />
                            <span className="text-[13px] leading-[140%] group-hover:text-[#111] transition-colors duration-150">
                              {sec.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 w-full min-w-0 px-[20px] sm:px-[32px] min-[1000px]:px-[40px] xl:px-[64px] py-[40px] min-[1000px]:py-[32px] pb-[120px] md:pb-[200px]">
            <div className="w-full max-w-[680px]">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* RIGHT MINIMAP (Fixed to viewport) */}
      <div className="hidden lg:flex flex-col items-end pr-[20px] xl:pr-[32px] fixed right-0 top-[89px] h-[calc(100vh-89px)] justify-center z-[100] pointer-events-none">
        <div className="pointer-events-auto">
          <ScrollMinimap />
        </div>
      </div>
    </div>
  );
}
