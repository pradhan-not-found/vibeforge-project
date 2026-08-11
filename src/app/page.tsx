import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-surface min-h-screen text-ink font-[family-name:var(--font-neoris)] flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,12,0.8)] backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-lime-300 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <span className="font-[550] text-[18px] tracking-[-0.02em] text-white">Checkpost</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[14px] font-medium text-ink-muted hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-white text-black font-medium rounded-lg text-[14px] hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="px-3 py-1 border border-lime-500/30 bg-lime-500/10 rounded-full text-lime-400 text-[13px] font-medium flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            Checkpost v1.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            The Web Application Firewall for <span className="text-lime-300">AI Agents</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-ink-muted max-w-2xl font-medium">
            Secure your autonomous AI workforce. Enforce zero-latency boundary rules, set strict budget ceilings, and pause dangerous tool calls for human review.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/signup" className="px-8 py-3.5 bg-lime-300 text-black font-bold rounded-xl text-[15px] hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(190,242,100,0.3)]">
              Start Securing Agents
            </Link>
            <Link href="/dashboard" className="px-8 py-3.5 bg-surface-raised border border-[rgba(255,255,255,0.1)] text-white font-medium rounded-xl text-[15px] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              View Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Pillars / Features */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-16">Three Pillars of Checkpost Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-surface-raised p-8 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-lg hover:border-lime-500/30 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deterministic Policy Engine</h3>
              <p className="text-ink-muted leading-relaxed text-[15px]">
                A sub-millisecond rule engine based on declarative YAML. Block destructive shell commands and unauthorized queries with zero latency added to your agent's workflow.
              </p>
            </div>

            <div className="bg-surface-raised p-8 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-lg hover:border-lime-500/30 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-2xl">
                💰
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cost Governance & Loop Protection</h3>
              <p className="text-ink-muted leading-relaxed text-[15px]">
                Track accumulated costs and establish hard caps on loop counts and retries. Prevent AI agents from entering expensive retry loops instantly.
              </p>
            </div>

            <div className="bg-surface-raised p-8 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-lg hover:border-lime-500/30 transition-colors">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-2xl">
                👀
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Human-in-the-Loop (HITL)</h3>
              <p className="text-ink-muted leading-relaxed text-[15px]">
                Perform a "synchronous hold" on highly sensitive tool calls. Operators can manually click "Approve" or "Reject" from a live visual dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[rgba(255,255,255,0.05)] bg-[#050505]">
        <div className="flex items-center justify-center gap-2 mb-4 text-ink-muted">
          <div className="w-4 h-4 rounded bg-lime-300 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <span className="font-bold text-white">Checkpost Security</span>
        </div>
        <p className="text-ink-muted text-[13px]">
          &copy; {new Date().getFullYear()} Checkpost. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
