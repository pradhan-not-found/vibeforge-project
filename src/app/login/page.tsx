import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center font-[family-name:var(--font-neoris)] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 border border-border-card shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-lime-300 border border-[rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <span className="font-[550] text-[18px] tracking-[-0.02em] text-ink">Checkpost</span>
          </Link>
          <h1 className="text-2xl font-[550] tracking-[-0.03em] text-ink">Welcome back</h1>
          <p className="text-[14px] text-ink-muted mt-2">Enter your credentials to access your WAF dashboard.</p>
        </div>

        <form action="/dashboard" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="agent@company.com" 
              className="w-full h-10 px-3 rounded-lg border border-border-pill bg-surface-raised focus:outline-none focus:border-ink transition-colors text-[14px]" 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full h-10 px-3 rounded-lg border border-border-pill bg-surface-raised focus:outline-none focus:border-ink transition-colors text-[14px]" 
            />
          </div>
          
          <button type="submit" className="w-full h-11 mt-4 bg-ink text-white font-medium rounded-xl hover:bg-black transition-colors text-[14px]">
            Sign In to Dashboard
          </button>
        </form>

        <p className="text-center text-[13px] text-ink-muted mt-8">
          Don't have an account? <Link href="/signup" className="text-ink font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
