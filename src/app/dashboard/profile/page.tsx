export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-ink">My Profile</h1>
        <p className="text-[14px] text-ink-muted">Manage your personal settings and company information.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-border-card shadow-sm flex flex-col gap-6">
        
        <div className="flex items-center gap-6 pb-6 border-b border-border-card">
          <div className="w-20 h-20 rounded-full bg-ink text-white flex items-center justify-center font-bold text-3xl">
            JD
          </div>
          <div className="flex flex-col gap-1">
            <button className="px-3 py-1.5 bg-surface border border-border-card text-ink rounded-md text-[13px] font-medium hover:bg-[rgba(0,0,0,0.05)] transition-colors w-fit">
              Upload Picture
            </button>
            <span className="text-[12px] text-ink-muted">JPG or PNG, max 2MB.</span>
          </div>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Full Name</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="w-full h-10 px-3 rounded-lg border border-border-pill bg-surface-raised focus:outline-none focus:border-ink transition-colors text-[14px]" 
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Email Address</label>
            <input 
              type="email" 
              defaultValue="john@acmecorp.com"
              disabled
              className="w-full h-10 px-3 rounded-lg border border-border-pill bg-[rgba(0,0,0,0.02)] text-ink-muted cursor-not-allowed text-[14px]" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Role</label>
            <input 
              type="text" 
              defaultValue="Company Admin"
              disabled
              className="w-full h-10 px-3 rounded-lg border border-border-pill bg-[rgba(0,0,0,0.02)] text-ink-muted cursor-not-allowed text-[14px]" 
            />
          </div>

          <button type="button" className="w-fit px-6 py-2 mt-2 bg-ink text-white font-medium rounded-lg hover:bg-black transition-colors text-[14px]">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
