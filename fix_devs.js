const fs = require('fs');

const devsSection = `
<div className="w-full bg-white py-24 flex flex-col items-center justify-center border-t border-border-divider">
  <div className="text-center mb-16">
    <h2 className="text-[32px] md:text-[40px] text-ink font-medium tracking-tight mb-4" style={{ fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold" }}>Meet the Devs</h2>
    <p className="text-[16px] text-ink-muted">Made with ❤️ for devs by devs.</p>
  </div>

  <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center max-w-5xl mx-auto px-6">
    
    {/* Profile 1 */}
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border border-border-pill shadow-sm shrink-0 bg-surface">
        <img src="/teams/anirudhhadas.png" alt="Aniruddha Das" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[18px] text-ink font-medium tracking-tight mb-1">Aniruddha Das</h3>
        <p className="text-[13px] text-ink-muted mb-3">Full Stack Developer</p>
        <div className="flex items-center gap-3 text-ink-muted">
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></a>
        </div>
      </div>
    </div>

    {/* Profile 2 */}
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border border-border-pill shadow-sm shrink-0 bg-surface">
        <img src="/teams/sattwikdas.png" alt="Sattwik Das" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[18px] text-ink font-medium tracking-tight mb-1">Sattwik Das</h3>
        <p className="text-[13px] text-ink-muted mb-3">Full Stack Developer</p>
        <div className="flex items-center gap-3 text-ink-muted">
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></a>
        </div>
      </div>
    </div>

    {/* Profile 3 */}
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border border-border-pill shadow-sm shrink-0 bg-surface">
        <img src="/teams/souradeeppradhan.png" alt="Souradeep Pradhan" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-[18px] text-ink font-medium tracking-tight mb-1">Souradeep Pradhan</h3>
        <p className="text-[13px] text-ink-muted mb-3">Full Stack Developer</p>
        <div className="flex items-center gap-3 text-ink-muted">
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="#" className="hover:text-ink transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></a>
        </div>
      </div>
    </div>

  </div>
</div>
`;

const pagePath = 'src/app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');

const startMatch = page.indexOf('<div className="relative w-full overflow-hidden bg-surface pt-[20px] min-[1100px]:pt-[20px] pb-[80px] min-[768px]:pb-[120px]">');
const endMatch = page.indexOf('<footer');

if (startMatch !== -1 && endMatch !== -1) {
    page = page.substring(0, startMatch) + devsSection + page.substring(endMatch);
    fs.writeFileSync(pagePath, page);
    console.log('Successfully replaced huge orchestration section with Meet the Devs!');
} else {
    console.log('Could not find boundaries.');
}

