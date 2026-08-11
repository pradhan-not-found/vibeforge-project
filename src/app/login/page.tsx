'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

/* ──────────────────────────────────────────────────────────
   Auth Panel (shared between desktop right + mobile bottom)
────────────────────────────────────────────────────────── */
function AuthPanel({ defaultTab }: { defaultTab: 'signin' | 'signup' }) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      alert('Google Auth Error: ' + (error.message || 'Unknown error. Have you enabled Google Sign-in in your Firebase Console?'));
    } finally {
      setLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center w-full px-6">
      {/* Tab Toggle */}
      <div className="flex items-center justify-center mb-[22px]">
        <div
          className="flex p-[3px] rounded-full"
          style={{ background: 'rgba(38,35,35,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.05) inset' }}
        >
          {(['signin', 'signup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-[6px] rounded-full transition-all duration-150"
              style={{
                padding: '7px 22px',
                fontSize: '13px',
                fontWeight: activeTab === tab ? 500 : 430,
                color: activeTab === tab ? 'rgba(38,35,35,0.9)' : 'rgba(38,35,35,0.4)',
                background: activeTab === tab ? 'rgba(255,255,255,0.95)' : 'transparent',
                boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)' : 'none',
                letterSpacing: '0.13px',
                fontFamily: 'inherit',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tab === 'signin' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              )}
              {tab === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-[10px] w-full max-w-[380px]">
        {/* Google */}
        <button 
          onClick={handleGoogleAuth}
          disabled={loading}
          className="cta-btn-dark bg-black !text-white flex items-center justify-center w-full gap-[10px] px-[16px] py-[10px] rounded-[8px] text-[14px] font-[500] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <GoogleIcon />
          {activeTab === 'signup' ? 'Sign up' : 'Sign in'} with Google
        </button>

        {/* GitHub */}
        <button 
          onClick={handleGithubAuth}
          disabled={loading}
          className="cta-btn-dark bg-black !text-white flex items-center justify-center w-full gap-[10px] px-[16px] py-[10px] rounded-[8px] text-[14px] font-[500] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <GitHubIcon />
          {activeTab === 'signup' ? 'Sign up' : 'Sign in'} with GitHub
        </button>

        {/* OR divider */}
        <div className="flex items-center gap-3 my-[2px]">
          <div className="flex-1 h-px" style={{ background: 'rgba(38,35,35,0.12)' }} />
          <span style={{ fontSize: '12px', color: 'rgba(38,35,35,0.35)', letterSpacing: '0.5px', fontWeight: 500 }}>OR</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(38,35,35,0.12)' }} />
        </div>

        {/* School email */}
        <button className="cta-btn-dark bg-black !text-white flex items-center justify-center w-full gap-[10px] px-[16px] py-[10px] rounded-[8px] text-[14px] font-[500] hover:opacity-90 transition-opacity">
          <EmailIcon />
          Continue with school email
        </button>
      </div>

      {/* Legal */}
      <p className="text-center mt-[28px]" style={{ fontSize: '12px', color: 'rgba(38,35,35,0.38)', lineHeight: '1.6', letterSpacing: '0.12px', maxWidth: '280px' }}>
        By continuing you agree to our<br />
        <Link href="#" style={{ color: 'rgba(38,35,35,0.5)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Privacy Policy</Link>
        {' '}and{' '}
        <Link href="#" style={{ color: 'rgba(38,35,35,0.5)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Terms of Service</Link>.
      </p>
    </div>
  );
}

/* ── Shared button style ── */
const darkPillStyle: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  borderRadius: '100px',
  padding: '15px 24px',
  fontSize: '15px',
  fontWeight: 600,
  color: '#FFFFFF',
  letterSpacing: '0.15px',
  background: 'linear-gradient(180deg, #2b2b2b 0%, #111111 100%)',
  boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 1.5px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.5) inset, 0 4px 16px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)',
  border: 'none',
  cursor: 'pointer',
};

/* ── Icons ── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

/* ── Pixel Art Background (used in both layouts) ── */
function PixelScene({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#5BA4E5', borderRadius: 'inherit' }}>
      <img src="/login/login-top-left-cloud.webp" alt="" aria-hidden className="absolute top-0 left-0 pointer-events-none" style={{ width: '55%', maxWidth: '380px', imageRendering: 'pixelated' }} />
      <img src="/login/login-top-right-tree.webp" alt="" aria-hidden className="absolute top-0 right-0 pointer-events-none" style={{ width: '48%', maxWidth: '340px', imageRendering: 'pixelated' }} />
      <img src="/login/login-bottom-left-hill-tree.webp" alt="" aria-hidden className="absolute bottom-0 left-0 pointer-events-none" style={{ width: '65%', maxWidth: '460px', imageRendering: 'pixelated' }} />
      <img src="/login/login-bottom-right-bush.webp" alt="" aria-hidden className="absolute bottom-0 right-0 pointer-events-none" style={{ width: '55%', maxWidth: '400px', imageRendering: 'pixelated' }} />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}

/* ── Desktop Left Panel Content ── */
function DesktopLeftContent() {
  return (
    <div className="relative z-10 flex flex-col h-full justify-center items-center px-8 py-10">
      <div className="max-w-[420px] text-center">
        <h2 className="text-white text-[26px] font-medium leading-[1.2] tracking-[0.15px] mb-4"
          style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)', textShadow: '0 1px 6px rgba(0,0,0,0.2)' }}>
          Enterprise-grade WAF<br />for AI Agents
        </h2>
        <p className="text-white/80 text-[14px] font-medium leading-[1.5] tracking-[0.14px]"
          style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)', textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
          Monitor your autonomous agent activity and firewall interventions.
          Checkpost protects your systems by enforcing policies, intercepting destructive actions, and preventing infinite loops.
        </p>
      </div>

      {/* Product UI mockup */}
      <div className="mt-8 w-full max-w-[520px]">
        <div className="rounded-[12px] overflow-hidden"
          style={{
            background: '#E7E7E3',
            boxShadow: '0 24px 48px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.1)',
            height: '280px',
            position: 'relative',
          }}>
          {/* Column headers */}
          <div className="absolute top-0 left-0 right-0 flex h-[36px] border-b border-black/5">
            {['Idea stage  1/1', 'Initial stage  0/3', 'Identity stage  0/4'].map((label) => (
              <div key={label} className="flex-1 flex items-center px-3 border-r border-black/5 last:border-0">
                <span style={{ fontSize: '9px', color: 'rgba(38,35,35,0.35)', fontFamily: 'var(--font-departure-mono, monospace)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
          {/* Dot grid */}
          <div className="absolute inset-[36px_0_0_0]"
            style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)', backgroundSize: '14px 14px', backgroundPosition: 'center' }} />
          {/* Task cards */}
          {[
            { col: 0, top: 60, label: 'Initial Idea', sub: 'User task', color: '#e8f4e8' },
            { col: 1, top: 50, label: 'Pick a Company Name', sub: 'User task', color: '#fff' },
            { col: 1, top: 100, label: 'Setup Codebase', sub: 'Agent task', color: '#fff' },
            { col: 1, top: 150, label: 'Incorporate LLC', sub: 'Agent task', color: '#fff', dim: true },
            { col: 2, top: 50, label: 'Setup Social Presence', sub: 'Agent task', color: '#fff', dim: true },
            { col: 2, top: 100, label: 'Buy Domain', sub: 'User task', color: '#fff', dim: true },
            { col: 2, top: 150, label: 'Logo & Brand Spec', sub: 'Agent task', color: '#fff', dim: true },
          ].map(({ col, top, label, sub, dim }) => (
            <div key={label}
              className="absolute rounded-[6px] flex items-center gap-[6px] px-[8px]"
              style={{
                left: `calc(${col * 33.33}% + 8px)`,
                top: `${top}px`,
                width: 'calc(33.33% - 16px)',
                height: '36px',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)',
                opacity: dim ? 0.4 : 1,
              }}>
              <div className="shrink-0 w-[18px] h-[18px] rounded-[3px] bg-[#f0f0ed]" />
              <div className="flex flex-col min-w-0">
                <span style={{ fontSize: '8px', color: 'rgba(38,35,35,0.75)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>{label}</span>
                <span style={{ fontSize: '7px', color: 'rgba(38,35,35,0.38)', fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>{sub}</span>
              </div>
            </div>
          ))}
          {/* Inner shadow overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-[12px]" style={{ boxShadow: 'rgba(152,146,140,0.16) 2px 3px 4px 0px inset' }} />
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-[6px] mt-5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[6px] w-[6px] rounded-full transition-all" style={{ background: i === 0 ? 'white' : 'rgba(255,255,255,0.3)' }} />
        ))}
      </div>
    </div>
  );
}

/* ── Footer Text ── */
function FooterText({ light = false }: { light?: boolean }) {
  const color = light ? 'rgba(255,255,255,0.55)' : 'rgba(120,100,90,0.7)';
  return (
    <p style={{
      fontFamily: 'var(--font-neoris, Georgia, serif)',
      fontSize: '13px',
      fontWeight: 400,
      fontStyle: 'italic',
      color,
      lineHeight: '1.5',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      flexWrap: 'wrap',
    }}>
      <span>Made with</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#c0605a" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', flexShrink: 0, marginBottom: '-1px' }} aria-label="love">
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
      </svg>
      <span>by Fantastic 4</span>
    </p>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Login() {
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (authLoading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center" style={{ background: '#EBEBEA' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[rgba(38,35,35,0.2)] border-t-[rgba(38,35,35,0.8)]"></div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)', background: '#EBEBEA', minHeight: '100dvh' }}>

      {/* ════════════════════════════════
          DESKTOP LAYOUT  (≥ 1000px)
          Left 54% = pixel scene + carousel
          Right 46% = auth form
      ════════════════════════════════ */}
      <div className="hidden min-[1000px]:flex min-h-screen">

        {/* Left panel */}
        <div className="w-[54%] p-[12px]">
          <div className="relative h-full rounded-[12px] overflow-hidden">
            <PixelScene>
              <DesktopLeftContent />
            </PixelScene>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col relative">
          {/* Centered auth content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Logo */}
            <h1 style={{ fontFamily: 'var(--font-geist-pixel-grid), monospace', fontSize: '32px', fontWeight: 500, color: '#1A1A1A', marginBottom: '6px', letterSpacing: '0.02em' }}>
              Checkpost
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(38,35,35,0.5)', fontWeight: 430, marginBottom: '36px', letterSpacing: '0.15px' }}>
              Let&apos;s secure your agents.
            </p>
            <AuthPanel defaultTab="signin" />
          </div>

          {/* Footer */}
          <div className="pb-10 text-center">
            <FooterText />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MOBILE LAYOUT  (< 1000px)
          Pixel scene at top, auth below
      ════════════════════════════════ */}
      <div className="flex flex-col min-[1000px]:hidden min-h-dvh">

        {/* Pixel art header */}
        <div className="relative w-full overflow-hidden" style={{ height: '260px', flexShrink: 0 }}>
          <PixelScene />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{ height: '80px', background: 'linear-gradient(to bottom, transparent, #EBEBEA)' }} />

          {/* Logo pill centered over the scene */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[10px] z-10">
            <div style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '8px',
              padding: '6px 20px 8px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.13), 0 0 0 1px rgba(255,255,255,0.5) inset',
            }}>
              <span style={{ fontFamily: 'var(--font-geist-pixel-grid), monospace', fontSize: '26px', fontWeight: 500, color: '#1A1A1A', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                Checkpost
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '14px', fontWeight: 460, letterSpacing: '0.14px', textShadow: '0 1px 6px rgba(0,0,0,0.25)', margin: 0 }}>
              Enterprise-grade WAF for AI Agents.
            </p>
          </div>
        </div>

        {/* Auth content */}
        <div className="flex-1 flex flex-col items-center pt-[28px] pb-[100px] w-full">
          <div className="w-full max-w-[420px]">
            <AuthPanel defaultTab="signin" />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full text-center pb-[28px]">
          <FooterText />
        </div>
      </div>

    </div>
  );
}
