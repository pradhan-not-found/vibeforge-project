'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen min-h-dvh flex flex-col min-[1000px]:flex-row bg-[#FAFAF7]">

      {/* ── Left panel ── */}
      <div className="hidden min-[1000px]:flex min-[1000px]:w-[58%] min-[1000px]:p-8 min-[1000px]:pl-10 min-[1000px]:pr-0">
        <section
          className="relative isolate flex h-full min-h-0 w-full overflow-hidden rounded-[12px]"
          style={{
            background: 'linear-gradient(to bottom, #2F91E7, #6DB6EF)',
            boxShadow: '0 2px 8px rgba(16,42,67,0.34), 0 18px 42px rgba(24,67,108,0.36)',
          }}
        >
          {/* Decorative elements */}
          {/* Hills bottom-left */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-[48%] h-[55%]"
            style={{ background: 'linear-gradient(135deg, #4CAF7B 0%, #2E8B57 60%, #1a5e38 100%)', borderRadius: '60% 100% 0 0 / 80% 100% 0 0' }} />
          {/* Cloud top-left */}
          <div className="pointer-events-none absolute top-8 left-8 w-[120px] h-[40px] bg-white/20 rounded-full blur-sm" />
          <div className="pointer-events-none absolute top-6 left-20 w-[80px] h-[30px] bg-white/15 rounded-full blur-sm" />
          {/* Trees right */}
          <div className="pointer-events-none absolute bottom-0 right-0 w-[18%]" style={{ height: '55%', background: 'linear-gradient(180deg, #2D7A4F 0%, #1a5e38 100%)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <div className="pointer-events-none absolute bottom-0 right-[10%] w-[14%]" style={{ height: '42%', background: 'linear-gradient(180deg, #3a9b60 0%, #1e7040 100%)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />

          {/* Content */}
          <div className="relative z-10 flex min-h-0 w-full flex-col items-center justify-center px-12 py-16 text-center">
            <h2 className="mx-auto max-w-[380px] text-balance text-[24px] font-normal leading-[115%] tracking-[0.15px] text-white">
              A full roadmap tailored to your company
            </h2>
            <p className="mt-[14px] text-balance text-[15px] font-[460] leading-[140%] tracking-[0.15px] text-white/90 max-w-[400px]">
              When you start a company, it's hard to know what's next. Checkpost guides you through every step and kicks off agents at each milestone as you build.
            </p>

            {/* Product UI preview card */}
            <div className="mt-10 w-full max-w-[540px]"
              style={{ background: 'rgba(251,251,248,0.80)', borderRadius: '12px', padding: '2px', boxShadow: '0 0 0 1.5px rgba(255,255,255,0.35) inset, 0 2px 0 0 #FFF inset, 0 0 2px 0 rgba(0,0,0,0.25), 0 0 0 4px rgba(232,231,230,0.32)' }}>
              <div className="rounded-[10px] overflow-hidden" style={{ background: '#E7E7E3' }}>
                {/* Stage header */}
                <div className="flex gap-1 px-2 pt-2 pb-1 text-[9px] font-mono text-black/40">
                  {['Idea stage · 1/1', 'Initial stage · 0/3', 'Identity stage · 0/4'].map((s) => (
                    <div key={s} className="flex-1 bg-[#F5F5F2] rounded-sm px-2 py-1 text-center" style={{ boxShadow: '0 0.15px 0 0 rgba(0,0,0,0.2), 0 0 0.6px 0 rgba(0,0,0,0.3)' }}>{s}</div>
                  ))}
                </div>
                {/* Task cards */}
                <div className="flex gap-1 px-2 pb-2">
                  {[
                    { col: 0, tasks: ['Initial Idea'] },
                    { col: 1, tasks: ['Pick a Company Name', 'Setup Codebase', 'Incorporate LLC'] },
                    { col: 2, tasks: ['Setup Social Presence', 'Buy Domain', 'Logo & Brand Spec', 'Open Bank Account'] },
                  ].map(({ col, tasks }) => (
                    <div key={col} className="flex-1 flex flex-col gap-1">
                      {tasks.map((t) => (
                        <div key={t} className="bg-white rounded-[6px] px-2 py-1.5 text-[9px] text-black/70 font-medium" style={{ boxShadow: '0 0 0 0.67px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)' }}>{t}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 min-[1000px]:px-16">
        <div className="w-full max-w-[360px]">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#171717]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 9L9 5L13 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 13L9 9L13 13" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <h1 className="text-center text-[22px] font-semibold text-[#111] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Welcome back
          </h1>
          <p className="text-center text-[14px] text-[#666] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Log in to your Checkpost account
          </p>

          {!sent ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="flex flex-col gap-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[13px] font-medium text-[#111]">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-[8px] border border-[#E5E5E5] bg-white px-3 py-2.5 text-[14px] text-[#111] outline-none placeholder:text-[#AAA] focus:border-[#111] focus:ring-1 focus:ring-[#111] transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-[8px] bg-[#111] py-2.5 text-[14px] font-medium text-white hover:bg-[#333] active:scale-[0.99] transition-all"
              >
                Continue with email
              </button>
            </form>
          ) : (
            <div className="rounded-[10px] border border-[#E5E5E5] bg-white p-5 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="mb-3 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="#2E7D32" strokeWidth="1.5"/><path d="M22 7l-10 7L2 7" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              <p className="text-[14px] font-medium text-[#111] mb-1">Check your email</p>
              <p className="text-[13px] text-[#666]">We sent a magic link to <strong>{email}</strong></p>
              <button onClick={() => setSent(false)} className="mt-4 text-[13px] text-[#111] underline underline-offset-2 hover:opacity-70">
                Use a different email
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="h-px flex-1 bg-[#E5E5E5]" />
            <span className="text-[12px] text-[#999]">or</span>
            <div className="h-px flex-1 bg-[#E5E5E5]" />
          </div>

          {/* Google */}
          <button
            className="flex w-full items-center justify-center gap-2.5 rounded-[8px] border border-[#E5E5E5] bg-white py-2.5 text-[14px] font-medium text-[#111] hover:bg-[#FAFAF7] active:scale-[0.99] transition-all shadow-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[13px] text-[#666]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-[#111] hover:underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
