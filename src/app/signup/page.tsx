import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(38, 35, 35, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(38, 35, 35, 1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#F5F5F2_80%)] pointer-events-none"></div>

      <div className="w-full max-w-[460px] bg-white/60 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-white/40 shadow-sm relative z-10 my-8">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <span className="text-black text-4xl" style={{ fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>Checkpost</span>
          </Link>
          <h1 className="text-2xl font-[500] tracking-tight text-ink mb-2">Create an account</h1>
          <p className="text-[14px] text-ink-muted leading-relaxed">Join Checkpost and manage your AI agent workforce.</p>
        </div>

        <form action="/dashboard" className="flex flex-col gap-5">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-ink uppercase tracking-wide">First Name</label>
              <input 
                type="text" 
                required
                placeholder="Ada" 
                className="w-full h-11 px-4 rounded-lg border border-border-pill bg-white focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all text-[14px] shadow-sm placeholder:text-gray-400" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-ink uppercase tracking-wide">Last Name</label>
              <input 
                type="text" 
                required
                placeholder="Lovelace" 
                className="w-full h-11 px-4 rounded-lg border border-border-pill bg-white focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all text-[14px] shadow-sm placeholder:text-gray-400" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-ink uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="agent@company.com" 
              className="w-full h-11 px-4 rounded-lg border border-border-pill bg-white focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all text-[14px] shadow-sm placeholder:text-gray-400" 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-ink uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full h-11 px-4 rounded-lg border border-border-pill bg-white focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all text-[14px] shadow-sm placeholder:text-gray-400" 
            />
          </div>
          
          <button type="submit" className="w-full h-12 mt-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all text-[15px] shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transform hover:-translate-y-[1px] active:translate-y-0">
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-divider/50 text-center">
          <p className="text-[14px] text-ink-muted">
            Already have an account? <Link href="/login" className="text-black font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
