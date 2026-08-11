'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  return (
    <div className="flex min-w-full snap-start snap-always flex-col justify-center overflow-hidden">
      <div className="mx-auto max-w-[480px] text-center">
        <h2
          className="mx-auto max-w-[380px] text-balance text-[24px] font-normal leading-[115%] tracking-[0.15px] text-white"
          style={{ fontFamily: 'var(--font-tt-neoris)' }}
        >
          A full roadmap tailored to your company
        </h2>
        <p
          className="mt-[14px] text-balance text-[15px] leading-[140%] tracking-[0.15px] text-white"
          style={{ fontFamily: 'var(--font-tt-neoris)', fontWeight: 460 }}
        >
          When you start a company, it&apos;s hard to know what&apos;s next. Checkpost guides you through every step to get a real business started, and kicks off agents at each milestone as you build.
        </p>
      </div>

      {/* Product UI preview */}
      <div className="flex min-h-0 items-center justify-center overflow-hidden px-8">
        <div className="flex max-h-full max-w-full shrink origin-center items-center justify-center min-[1000px]:scale-[0.74] 2xl:scale-[0.82]">
          <div
            className="relative h-[400px] w-[707px] shrink-0 overflow-hidden"
            style={{ borderRadius: '12px', background: 'var(--Bg-darker,#E7E7E3)' }}
          >
            {/* Column backgrounds */}
            <div className="absolute top-[-25px] left-0 flex gap-[5px] w-[707px]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 h-[473px] rounded-[4px] overflow-hidden">
                  <Image alt="" loading="lazy" width={232} height={473} src="/homepage/product-ui-1/col-bg.png" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Stage headers */}
            <div className="absolute top-[9px] left-0 flex w-full gap-x-[5px]">
              {[
                { label: 'Idea stage', count: '1/1' },
                { label: 'Initial stage', count: '0/3' },
                { label: 'Identity stage', count: '0/4' },
              ].map(({ label, count }) => (
                <div key={label} className="flex-1 min-w-[232px]">
                  <div className="flex items-center justify-between px-[11px] py-[3px]">
                    <span
                      className="inline-flex items-center justify-center px-[8px] py-[2.5px] rounded-full text-[9px] font-normal"
                      style={{
                        fontFamily: 'var(--font-departure-mono)',
                        color: 'rgba(38,35,35,0.5)',
                        background: 'rgb(245,245,242)',
                        lineHeight: '10.78px',
                        boxShadow:
                          'rgba(0,0,0,0.2) 0px 0.15px 0px 0px,white 0px 0.3px 0.3px 0px,rgba(0,0,0,0.3) 0px 0px 0.6px 0px,rgba(255,255,255,0.6) 0px 0.3px 0.3px 0px inset,rgba(0,0,0,0.05) 0px -0.3px 0.3px 0px inset',
                      }}
                    >
                      {label}
                    </span>
                    <span className="text-[8px] font-medium" style={{ fontFamily: 'var(--font-departure-mono)', color: 'rgba(38,35,35,0.4)' }}>
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Center card - Idea */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[232px] px-[20px] py-[6px]">
              <TaskCard icon="/homepage/product-ui-1/icon-idea-new.png" label="Initial Idea" sublabel="User task" />
            </div>

            {/* Initial stage cards */}
            {[
              { top: 114, icon: '/homepage/product-ui-1/icon-company-name.png', label: 'Pick a Company Name', sub: 'User task' },
              { top: 173, icon: '/homepage/product-ui-1/icon-codebase.png', label: 'Setup Codebase', sub: 'Agent task' },
              { top: 232, icon: '/homepage/product-ui-1/icon-llc.png', label: 'Incorporate LLC', sub: 'Agent requires approval' },
            ].map(({ top, icon, label, sub }) => (
              <div
                key={label}
                className="absolute left-[237px] w-[232px] px-[20px] py-[6px]"
                style={{ top, opacity: 0.4 }}
              >
                <TaskCard icon={icon} label={label} sublabel={sub} />
              </div>
            ))}

            {/* Identity stage cards */}
            <div className="absolute left-[474px] top-[53px] w-[232px] flex flex-col" style={{ opacity: 0.4 }}>
              {[
                { icon: '/homepage/product-ui-1/icon-social-presence.png', label: 'Setup Social Presence', sub: 'Agent task' },
                { icon: '/homepage/product-ui-1/icon-buy-domain.png', label: 'Buy Domain', sub: 'User task' },
                { icon: '/homepage/product-ui-1/icon-brand-spec.png', label: 'Logo & Brand Spec', sub: 'Agent task' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="px-[20px] py-[6px]">
                  <TaskCard icon={icon} label={label} sublabel={sub} />
                </div>
              ))}
            </div>

            <div className="absolute left-[474px] top-[343px] w-[232px] px-[20px] py-[6px]" style={{ opacity: 0.4 }}>
              <TaskCard icon="/homepage/product-ui-1/icon-bank.png" label="Open Bank Account" sublabel="Agent requires approval" />
            </div>

            {/* Inner shadow overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-[12px]"
              aria-hidden="true"
              style={{ boxShadow: 'rgba(152,146,140,0.16) 2px 3px 4px 0px inset' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Login form (right side) ───────────────────────────────────────────────
function LoginForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: 'rgb(235,251,238)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="#2E7D32" strokeWidth="1.5" />
            <path d="M22 7l-10 7L2 7" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[rgba(38,35,35,0.9)]" style={{ fontFamily: 'var(--font-tt-neoris)' }}>
            Check your email
          </p>
          <p className="mt-1 text-[14px] text-[rgba(38,35,35,0.6)]" style={{ fontFamily: 'var(--font-tt-neoris)' }}>
            We sent a magic link to <strong className="text-[rgba(38,35,35,0.9)]">{email}</strong>
          </p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="text-[13px] text-[rgba(38,35,35,0.6)] underline underline-offset-2 hover:text-[rgba(38,35,35,0.9)] transition-colors"
          style={{ fontFamily: 'var(--font-tt-neoris)' }}
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1
          className="text-[24px] font-normal leading-[120%] text-[rgba(38,35,35,0.9)]"
          style={{ fontFamily: 'var(--font-tt-neoris)' }}
        >
          Welcome to Checkpost
        </h1>
        <p
          className="mt-2 text-[15px] leading-[140%] text-[rgba(38,35,35,0.6)]"
          style={{ fontFamily: 'var(--font-tt-neoris)', fontWeight: 430 }}
        >
          Log in or create an account to get started.
        </p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="login-email"
            className="text-[13px] font-medium text-[rgba(38,35,35,0.7)]"
            style={{ fontFamily: 'var(--font-tt-neoris)' }}
          >
            Email address
          </label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-[8px] border border-[rgba(38,35,35,0.16)] bg-white px-[12px] py-[10px] text-[14px] text-[rgba(38,35,35,0.9)] outline-none placeholder:text-[rgba(38,35,35,0.3)] focus:border-[rgba(38,35,35,0.5)] focus:ring-2 focus:ring-[rgba(38,35,35,0.08)] transition-all"
            style={{ fontFamily: 'var(--font-tt-neoris)', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px 0px inset' }}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-[8px] py-[11px] text-[15px] font-medium text-white transition-all hover:opacity-90 active:scale-[0.99]"
          style={{
            fontFamily: 'var(--font-tt-neoris)',
            fontWeight: 460,
            background: 'linear-gradient(rgb(45,45,45) 0%,rgb(28,28,28) 100%)',
            boxShadow:
              'rgba(0,0,0,0.25) 0px 1px 3px 0px,rgba(255,255,255,0.12) 0px 1px 0px 0px inset,rgba(0,0,0,0.35) 0px -1px 2px 0px inset',
          }}
        >
          Send magic link
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 w-full">
        <div className="h-px flex-1 bg-[rgba(38,35,35,0.1)]" />
        <span
          className="text-[12px] text-[rgba(38,35,35,0.4)]"
          style={{ fontFamily: 'var(--font-tt-neoris)' }}
        >
          or
        </span>
        <div className="h-px flex-1 bg-[rgba(38,35,35,0.1)]" />
      </div>

      {/* Google */}
      <button
        className="flex w-full items-center justify-center gap-[8px] rounded-[8px] border border-[rgba(38,35,35,0.14)] bg-white py-[10px] text-[14px] font-medium text-[rgba(38,35,35,0.8)] transition-all hover:bg-[rgba(38,35,35,0.03)] active:scale-[0.99]"
        style={{
          fontFamily: 'var(--font-tt-neoris)',
          fontWeight: 460,
          boxShadow: 'rgba(0,0,0,0.06) 0px 1px 2px 0px,rgba(255,255,255,0.8) 0px 1px 0px 0px inset',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <p
        className="mt-6 text-center text-[13px] text-[rgba(38,35,35,0.5)]"
        style={{ fontFamily: 'var(--font-tt-neoris)' }}
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-[rgba(38,35,35,0.8)] underline underline-offset-2 hover:text-[rgba(38,35,35,1)] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function Login() {
  return (
    <div className="login-page-theme-light min-h-screen min-h-dvh bg-[#FAFAF8]" style={{ fontFamily: 'var(--font-tt-neoris)' }}>
      <div className="mx-auto flex min-h-screen min-h-dvh w-full max-w-[1440px] flex-col min-[1000px]:flex-row">

        {/* ── Left panel ── */}
        <div className="hidden min-h-screen min-h-dvh min-[1000px]:flex min-[1000px]:w-[58%] min-[1000px]:p-8 min-[1000px]:pl-10 min-[1000px]:pr-0">
          <section
            className="relative isolate flex h-full min-h-0 w-full overflow-hidden rounded-[12px]"
            style={{
              background: 'linear-gradient(to bottom, #2F91E7, #6DB6EF)',
              boxShadow: '0 2px 8px rgba(16,42,67,0.34), 0 18px 42px rgba(24,67,108,0.36)',
            }}
          >
            {/* Decorative images */}
            <Image
              aria-hidden
              alt=""
              loading="lazy"
              width={1303}
              height={1124}
              src="/login/login-bottom-left-hill-tree.webp"
              className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[48%] min-w-[340px] max-w-[560px]"
              sizes="(min-width:1280px) 48vw, 560px"
            />
            <Image
              aria-hidden
              alt=""
              loading="lazy"
              width={455}
              height={619}
              src="/login/login-bottom-right-bush.webp"
              className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[21%] min-w-[135px] max-w-[195px]"
              sizes="(min-width:1280px) 21vw, 195px"
            />
            <Image
              aria-hidden
              alt=""
              loading="lazy"
              width={856}
              height={486}
              src="/login/login-top-left-cloud.webp"
              className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[37%] min-w-[235px] max-w-[385px]"
              sizes="(min-width:1280px) 37vw, 385px"
            />
            <Image
              aria-hidden
              alt=""
              loading="lazy"
              width={905}
              height={913}
              src="/login/login-top-right-tree.webp"
              className="pointer-events-none absolute right-0 top-0 z-0 h-auto w-[34%] min-w-[215px] max-w-[325px]"
              sizes="(min-width:1280px) 34vw, 325px"
            />

            {/* Slide area */}
            <div className="relative z-10 flex min-h-0 w-full pt-16 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Slide1 />
            </div>
          </section>
        </div>

        {/* ── Right panel (form) ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 min-[1000px]:px-16">
          {/* Logo mark */}
          <div className="mb-8 flex justify-center">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[8px]"
              style={{
                background: 'linear-gradient(rgb(38,38,38) 0%,rgb(18,18,18) 100%)',
                boxShadow: 'rgba(0,0,0,0.25) 0px 1px 3px 0px,rgba(255,255,255,0.12) 0px 1px 0px 0px inset',
              }}
            >
              {/* Cofounder-style chevron mark */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 10L10 6L14 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 14L10 10L14 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="w-full max-w-[360px]">
            <LoginForm />
          </div>
        </div>

      </div>
    </div>
  );
}
