'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ── Task card used in the product UI preview ──────────────────────────────
function TaskCard({
  icon,
  label,
  sublabel,
}: {
  icon: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div
      className="flex items-center justify-between h-[40px] pl-[6px] pr-[8px] py-[6px] rounded-[8px] w-full"
      style={{
        background: 'rgb(255,255,255)',
        boxShadow:
          'rgba(0,0,0,0.08) 0px 0px 0px 0.67px,rgba(0,0,0,0.02) 0px 0px 13.4px 0px,rgba(0,0,0,0.01) 0px 13.4px 13.4px 0px,rgba(0,0,0,0.02) 0px 4px 6px 0px,rgba(0,0,0,0.03) 0px 2px 5.4px 0px,white 0px 0px 0px 0.67px inset',
      }}
    >
      <div className="flex items-center gap-[6.7px] h-full">
        <div
          className="shrink-0 w-[28px] h-[28px] rounded-[4px] overflow-hidden relative flex items-center justify-center"
          style={{
            background: 'linear-gradient(rgb(255,255,255) 0%,rgb(245,245,242) 100%)',
            boxShadow:
              'rgba(255,255,255,0.15) 0px 0.334px 0.669px 0px inset,rgba(0,0,0,0.24) 0px 0.334px 0.4px 0px,rgba(255,255,255,0.1) 0px 0.669px 0.669px 0px,rgba(0,0,0,0.2) 0px 0px 1.338px 0px',
          }}
        >
          <Image alt="" loading="lazy" width={26} height={26} src={icon} />
        </div>
        <div className="flex flex-col gap-[4px]">
          <span
            className="text-[10px] leading-none whitespace-nowrap"
            style={{ color: 'rgba(38,35,35,0.7)', fontFamily: 'var(--font-tt-neoris)', fontWeight: 430, letterSpacing: '0.1px' }}
          >
            {label}
          </span>
          <span
            className="text-[8px] leading-[9.4px] whitespace-nowrap"
            style={{ color: 'rgba(38,35,35,0.4)', fontFamily: 'var(--font-tt-neoris)', fontWeight: 400, letterSpacing: '0.08px' }}
          >
            {sublabel}
          </span>
        </div>
      </div>
      {/* Arrow */}
      <div
        className="shrink-0 flex items-center justify-center w-[15px] h-[16px] rounded-[3px]"
        style={{
          background: 'linear-gradient(rgb(235,235,232),rgb(245,245,242))',
          backdropFilter: 'blur(16px)',
          boxShadow:
            'rgba(0,0,0,0.12) 0px -0.5px 0px 0px inset,rgba(0,0,0,0.1) 0px -1px 2px 0px inset,rgba(255,255,255,0.24) 0px 1px 1px 0px inset',
        }}
      >
        <svg width="7" height="8" viewBox="0 0 9 10" fill="none" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}>
          <path
            d="M4.5 1.5L4.5 8.5M4.5 1.5L7.5 4.5M4.5 1.5L1.5 4.5"
            stroke="rgba(32,32,32,0.35)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ── The left-panel slide 1: roadmap ──────────────────────────────────────
function Slide1() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex min-w-full snap-start snap-always flex-col justify-center overflow-hidden h-full">
      <div className="mx-auto max-w-[480px] text-center pt-[5%] z-20">
        <h2
          className="mx-auto max-w-[380px] text-balance text-[26px] font-medium leading-[115%] tracking-[0.15px] text-white"
          style={{ fontFamily: 'var(--font-tt-neoris)' }}
        >
          A full roadmap tailored<br />to your company
        </h2>
        <p
          className="mt-[18px] text-balance text-[15px] leading-[140%] tracking-[0.15px] text-white"
          style={{ fontFamily: 'var(--font-tt-neoris)', fontWeight: 500 }}
        >
          When you start a company, it&apos;s hard to know what&apos;s next.<br />
          Cofounder guides you through every step to get a real business<br />
          started, and kicks off agents at each milestone as you build.
        </p>
      </div>

      {/* Product UI preview (floating with subtle animation) */}
      <div className="flex min-h-0 items-center justify-center px-8 flex-1 relative z-10 mt-[30px]">
        <div 
          className="flex shrink origin-center items-center justify-center transition-transform duration-1000 ease-out min-[1000px]:scale-[0.85] 2xl:scale-[1]"
          style={{
            transform: mounted ? 'translateY(0) scale(0.85)' : 'translateY(20px) scale(0.85)',
            opacity: mounted ? 1 : 0
          }}
        >
          <div
            className="relative h-[340px] w-[600px] shrink-0 overflow-hidden"
            style={{ 
              borderRadius: '12px', 
              background: 'var(--Bg-darker,#E7E7E3)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            {/* Column backgrounds */}
            <div className="absolute top-0 left-0 flex h-full w-[600px]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 h-full border-r border-[rgba(0,0,0,0.03)] last:border-0 relative">
                  {/* Subtle dotted grid pattern */}
                  <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center' }}></div>
                </div>
              ))}
            </div>

            {/* Stage headers */}
            <div className="absolute top-[12px] left-0 flex w-full">
              {[
                { label: 'Idea stage', count: '1/1' },
                { label: 'Initial stage', count: '0/3' },
                { label: 'Identity stage', count: '0/4' },
              ].map(({ label, count }) => (
                <div key={label} className="flex-1 px-[16px]">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center justify-center text-[10px] font-normal"
                      style={{ fontFamily: 'var(--font-departure-mono)', color: 'rgba(38,35,35,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                    >
                      {label}
                    </span>
                    <span className="text-[9px] font-medium" style={{ fontFamily: 'var(--font-departure-mono)', color: 'rgba(38,35,35,0.3)' }}>
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Path connector line */}
            <svg className="absolute left-[80px] top-[148px] w-[400px] h-[100px]" style={{ zIndex: 1, pointerEvents: 'none' }}>
               <path d="M 0 0 L 150 0 L 150 70 L 320 70" fill="none" stroke="#2F91E7" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
            </svg>

            {/* Center card - Idea */}
            <div className="absolute left-[16px] top-[128px] w-[168px] z-10">
              <TaskCard icon="/homepage/product-ui-1/icon-idea-new.png" label="Initial Idea" sublabel="User task" />
            </div>

            {/* Initial stage cards */}
            {[
              { top: 80, icon: '/homepage/product-ui-1/icon-company-name.png', label: 'Pick a Company Name', sub: 'User task' },
              { top: 128, icon: '/homepage/product-ui-1/icon-codebase.png', label: 'Setup Codebase', sub: 'Agent task', active: true },
              { top: 188, icon: '/homepage/product-ui-1/icon-llc.png', label: 'Incorporate LLC', sub: 'Agent requires approval' },
            ].map(({ top, icon, label, sub, active }) => (
              <div
                key={label}
                className="absolute left-[216px] w-[168px] z-10"
                style={{ top, opacity: active ? 1 : 0.4 }}
              >
                <TaskCard icon={icon} label={label} sublabel={sub} />
              </div>
            ))}

            {/* Identity stage cards */}
            <div className="absolute left-[416px] top-[40px] w-[168px] flex flex-col gap-[12px] z-10" style={{ opacity: 0.4 }}>
              {[
                { icon: '/homepage/product-ui-1/icon-social-presence.png', label: 'Setup Social Presence', sub: 'Agent task' },
                { icon: '/homepage/product-ui-1/icon-buy-domain.png', label: 'Buy Domain', sub: 'User task' },
                { icon: '/homepage/product-ui-1/icon-brand-spec.png', label: 'Logo & Brand Spec', sub: 'Agent task' },
              ].map(({ icon, label, sub }) => (
                <TaskCard key={label} icon={icon} label={label} sublabel={sub} />
              ))}
            </div>

            <div className="absolute left-[416px] top-[260px] w-[168px] z-10" style={{ opacity: 0.4 }}>
              <TaskCard icon="/homepage/product-ui-1/icon-bank.png" label="Open Bank Account" sublabel="Agent requires approval" />
            </div>

            {/* Inner shadow overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-[12px]"
              aria-hidden="true"
              style={{ boxShadow: 'rgba(152,146,140,0.16) 2px 3px 4px 0px inset' }}
            />
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-[20px] left-0 w-full flex justify-center gap-[6px] z-20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-[6px] w-[6px] rounded-full transition-all ${i === 0 ? 'bg-white' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
}


// ── Page ─────────────────────────────────────────────────────────────────
export default function Signup() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');

  return (
    <div className="login-page-theme-light min-h-screen min-h-dvh bg-white flex" style={{ fontFamily: 'var(--font-tt-neoris)' }}>
      {/* ── Left panel ── */}
      <div className="hidden min-h-screen min-[1000px]:flex min-[1000px]:w-[54%] p-[12px]">
        <section
          className="relative isolate flex h-full w-full overflow-hidden rounded-[12px]"
          style={{ background: '#4995E0' }} // Exactly match the blue sky color
        >
          {/* Pixel-art images */}
          <Image
            aria-hidden
            alt=""
            loading="lazy"
            width={1303}
            height={1124}
            src="/login/login-bottom-left-hill-tree.webp"
            className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-full max-w-[700px] object-cover object-bottom"
            style={{ imageRendering: 'pixelated' }}
          />
          <Image
            aria-hidden
            alt=""
            loading="lazy"
            width={856}
            height={486}
            src="/login/login-top-left-cloud.webp"
            className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[45%] min-w-[280px]"
            style={{ imageRendering: 'pixelated' }}
          />
          <Image
            aria-hidden
            alt=""
            loading="lazy"
            width={905}
            height={913}
            src="/login/login-top-right-tree.webp"
            className="pointer-events-none absolute right-0 top-0 z-0 h-auto w-[45%] min-w-[280px]"
            style={{ imageRendering: 'pixelated' }}
          />
          {/* Slide area */}
          <div className="relative z-10 flex min-h-0 w-full h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Slide1 />
          </div>
        </section>
      </div>

      {/* ── Right panel (Auth) ── */}
      <div className="flex flex-1 flex-col relative px-6 py-12 min-[1000px]:px-16">
        
        {/* Main Content Centered */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[380px] mx-auto">
          
          {/* Logo mark */}
          <div className="mb-4 flex justify-center">
            <h1 className="text-[40px] leading-none text-[#1A1A1A] font-normal" style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
              Cofounder
            </h1>
          </div>

          <p className="mb-10 text-[16px] text-[rgba(38,35,35,0.55)] font-normal text-center" style={{ fontFamily: 'var(--font-tt-neoris)' }}>
            Let&apos;s build your company.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center p-[4px] rounded-full bg-[#F5F5F2] border border-[#EBEBE8] mb-8 w-fit mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex items-center justify-center gap-[6px] px-6 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeTab === 'signin' 
                  ? 'bg-white text-[#1A1A1A] shadow-sm border border-[rgba(0,0,0,0.04)]' 
                  : 'text-[rgba(38,35,35,0.4)] hover:text-[rgba(38,35,35,0.7)]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex items-center justify-center gap-[6px] px-6 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeTab === 'signup' 
                  ? 'bg-white text-[#1A1A1A] shadow-[0_2px_4px_rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.04)]' 
                  : 'text-[rgba(38,35,35,0.4)] hover:text-[rgba(38,35,35,0.7)]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              Sign Up
            </button>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* Google Pill Button */}
            <button
              className="group relative flex w-full items-center justify-center gap-[10px] rounded-full py-[14px] text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] overflow-hidden"
              style={{
                fontFamily: 'var(--font-tt-neoris)',
                background: 'linear-gradient(180deg, #242424 0%, #121212 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 1px 0 rgba(255,255,255,0.15) inset, 0 8px 24px -4px rgba(0,0,0,0.4)',
              }}
            >
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.4) inset' }}></div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="relative z-10 tracking-[0.2px]">{activeTab === 'signup' ? 'Sign up' : 'Sign in'} with Google</span>
            </button>

            {/* GitHub Pill Button */}
            <button
              className="group relative flex w-full items-center justify-center gap-[10px] rounded-full py-[14px] text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] overflow-hidden"
              style={{
                fontFamily: 'var(--font-tt-neoris)',
                background: 'linear-gradient(180deg, #242424 0%, #121212 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 1px 0 rgba(255,255,255,0.15) inset, 0 8px 24px -4px rgba(0,0,0,0.4)',
              }}
            >
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.4) inset' }}></div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 text-white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="relative z-10 tracking-[0.2px]">{activeTab === 'signup' ? 'Sign up' : 'Sign in'} with GitHub</span>
            </button>
          </div>

          <p className="mt-[50px] text-center text-[12px] leading-[150%] text-[rgba(38,35,35,0.45)] max-w-[240px]" style={{ fontFamily: 'var(--font-tt-neoris)' }}>
            By continuing you agree to our<br />
            <a href="#" className="underline underline-offset-[3px] hover:text-[rgba(38,35,35,0.7)] transition-colors">Privacy Policy</a> and <a href="#" className="underline underline-offset-[3px] hover:text-[rgba(38,35,35,0.7)] transition-colors">Terms of Service</a>.
          </p>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-10 left-0 w-full text-center">
          <p className="text-[13px] text-[rgba(38,35,35,0.4)] font-normal leading-[120%]" style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
            The General Intelligence<br />
            Company Of New York
          </p>
        </div>
      </div>
    </div>
  );
}


