const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Remove duplicate pricing section at bottom
const bottomPricingStart = `      {/* ──────────────────────────────────────────────────────────\n         PRICING SECTION`;
const footerStart = `      <footer className="w-full footer-bg relative overflow-x-hidden">`;
let bottomIndex = code.lastIndexOf(bottomPricingStart);
let footerIndex = code.lastIndexOf(footerStart);
if (bottomIndex !== -1 && footerIndex !== -1 && bottomIndex < footerIndex) {
    code = code.substring(0, bottomIndex) + code.substring(footerIndex);
}

// 2. Replace old pricing section and insert Tools & Systems before it.
const oldPricingStart = `<div id="pricing" className="w-full bg-surface py-[80px] md:py-[120px] flex flex-col items-center justify-center">`;
const meetDevsStart = `<div className="w-full bg-white py-24 flex flex-col items-center justify-center border-t border-border-divider">`;

let oldPIdx = code.indexOf(oldPricingStart);
let mDevsIdx = code.indexOf(meetDevsStart);
if (oldPIdx !== -1 && mDevsIdx !== -1 && oldPIdx < mDevsIdx) {
    const newSection = `{/* ──────────────────────────────────────────────────────────
         TOOLS AND SYSTEMS SECTION
      ────────────────────────────────────────────────────────── */}
      <section 
        className="relative w-full min-h-0 flex flex-col bg-[#1a6fd1] text-white overflow-hidden" 
        style={{
          backgroundImage: "url('/build-ui-bits/section-bg.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden select-none">
          <img alt="Left decor" src="/build-ui-bits/left-decor.png" className="absolute h-full max-[767px]:w-[80vw] w-[50vw] max-h-[725px] max-w-[812px] object-contain object-bottom-left bottom-[40px] left-0" />
          <img alt="Right top decor" src="/build-ui-bits/right-top-decor.png" className="absolute max-[767px]:hidden h-full w-full max-h-[434px] max-w-[694px] object-contain object-bottom-right md:top-[70px] -right-[4vw] lg:-right-[2vw] xl:right-0 xl:top-[50px] 2xl:hidden" />
          <img alt="Right bottom decor" src="/build-ui-bits/right-bottom-decor.png" className="absolute h-full lg:w-[36vw] w-full max-h-[684px] max-w-[694px] object-contain object-bottom-right lg:bottom-[3vw] bottom-[40px] right-0" />
          <img alt="Right small decor" src="/build-ui-bits/right-small-decor.png" className="absolute h-full w-[16vw] max-h-[317px] max-w-[219px] object-contain object-bottom-left bottom-[70px] right-0" />
          <img alt="Top border" src="/build-ui-bits/carousel-top.png" className="absolute h-full w-full min-w-full max-h-[92px] object-cover md:object-[95%_bottom] lg:object-[100%_bottom] top-0 hidden max-[1920px]:block" />
          <img alt="Bottom border" src="/build-ui-bits/carousel-bottom.png" className="absolute bottom-0 h-full w-full min-w-full max-h-[92px] object-cover object-top hidden lg:block" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute left-0 bottom-1/3 z-[1] w-[50vw] max-w-[391px] select-none">
          <img alt="Left clouds" src="/build-ui-bits/clouds-left.png" className="h-auto w-full" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-1/3 z-[1] w-[50vw] max-w-[488px] select-none">
          <img alt="Right clouds" src="/build-ui-bits/clouds-right.png" className="h-auto w-full" />
        </div>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center pt-[140px] pb-[160px] md:pb-[140px] lg:pb-[220px]">
          <div className="mx-auto max-w-[800px] px-6 text-center">
            <h2 
              style={{ lineHeight: '115%', textShadow: '0 0 3px rgba(0, 0, 0, 0.08), 0 0.5px 0.5px rgba(0, 0, 0, 0.12)' }}
              className="m-0 mx-auto text-[28px] md:text-[32px] lg:text-[40px] max-w-[25ch] font-bold"
            >
              Checkpost is a Web Application Firewall{" "}
              <span style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.80) -0.93%, rgba(255, 255, 255, 0.64) 104.17%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none'
              }}>
                designed exclusively for autonomous AI agents.
              </span>
            </h2>
            <p className="m-0 mx-auto mt-5 max-w-[580px] text-[16px] font-medium leading-[150%] text-white/70">
              Give agents the context, tools, and approvals they need to keep company work moving.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         PRICING SECTION
      ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="w-full relative flex flex-col items-center py-24 px-4 sm:px-8 bg-gradient-to-b from-transparent to-[#F2F2F2]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center">
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-[var(--app-ink)] mb-4" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              <span className="text-[var(--app-muted)]">Start simple.</span> Grow without limits.
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[var(--app-muted)] font-medium" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>
              Build and scale without managing the systems behind it.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Free Trial */}
            <div className="w-full rounded-2xl border border-[var(--app-hairline)] bg-[var(--app-canvas)] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
              <div className="p-6 pb-0">
                <p className="text-[13px] font-medium text-[var(--app-muted)] mb-3">Free Trial</p>
                <div className="w-full aspect-[1.8/1] rounded-xl overflow-hidden mb-6 relative">
                  <Image src="/assets/pricing/Free.avif" alt="Free Trial" fill className="object-cover" />
                </div>
                <p className="text-[13px] font-medium text-[var(--app-muted)] mb-2">7 day free trial</p>
                <h3 className="text-[36px] font-medium text-[var(--app-ink)]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
                  Free
                </h3>
              </div>
              <div className="p-6 pt-6 flex-1 flex flex-col justify-end">
                <div className="h-px w-full bg-[var(--app-hairline)] mb-6" />
                <ul className="space-y-4 mb-8 flex-1">
                  {['$10 in usage included', '7 days of Cofounder Pro', 'Access to multiple AI models', 'Agent-built previews', 'Preview environments'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="size-5 text-emerald-500 shrink-0" strokeWidth={2} />
                      <span className="text-[14px] text-[var(--app-ink)] font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/signup" className="w-full block text-center rounded-xl py-3 border border-[var(--app-hairline)] bg-[var(--app-soft)] hover:bg-[var(--app-canvas)] text-[var(--app-ink)] font-semibold text-[15px] transition-colors">
                  Get started
                </a>
              </div>
            </div>

            {/* Pro */}
            <div className="w-full rounded-2xl border-2 border-[var(--app-ink)] bg-[var(--app-canvas)] shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full relative -translate-y-2">
              <div className="absolute top-0 right-0 bg-[var(--app-ink)] text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
              <div className="p-6 pb-0">
                <p className="text-[13px] font-medium text-[var(--app-muted)] mb-3">Checkpost Pro</p>
                <div className="w-full aspect-[1.8/1] rounded-xl overflow-hidden mb-6 relative border border-[var(--app-hairline)]">
                  <Image src="/assets/pricing/Pro.avif" alt="Pro Plan" fill className="object-cover" />
                </div>
                <p className="text-[13px] font-medium text-[var(--app-muted)] mb-2">Starting at</p>
                <div className="flex items-end gap-1">
                  <h3 className="text-[36px] font-medium text-[var(--app-ink)]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>$20</h3>
                  <span className="text-[14px] text-[var(--app-muted)] mb-2 font-medium">/ month usage included</span>
                </div>
              </div>
              <div className="p-6 pt-6 flex-1 flex flex-col justify-end bg-gradient-to-b from-transparent to-blue-50/30">
                <div className="h-px w-full bg-[var(--app-hairline)] mb-6" />
                <ul className="space-y-4 mb-8 flex-1">
                  {['Everything in the Free Plan', 'Access to multiple AI models', 'Domain purchasing and hosting', 'Agent inboxes', 'Graduate data from the platform'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="size-5 text-emerald-500 shrink-0" strokeWidth={2} />
                      <span className="text-[14px] text-[var(--app-ink)] font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/signup" className="w-full block text-center rounded-xl py-3 bg-[var(--app-ink)] hover:bg-black text-white font-semibold text-[15px] shadow-sm transition-colors">
                  Get started
                </a>
              </div>
            </div>

            {/* Team */}
            <div className="w-full rounded-2xl border border-[var(--app-hairline)] bg-[var(--app-canvas)] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
              <div className="p-6 pb-0">
                <p className="text-[13px] font-medium text-[var(--app-muted)] mb-3">Team Plan</p>
                <div className="w-full aspect-[1.8/1] rounded-xl overflow-hidden mb-6 relative">
                  <Image src="/assets/pricing/Team.avif" alt="Team Plan" fill className="object-cover" />
                </div>
                <p className="text-[13px] font-medium text-[var(--app-muted)] mb-2">Coming soon</p>
                <div className="flex items-end gap-1">
                  <h3 className="text-[36px] font-medium text-[var(--app-ink)]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>$50</h3>
                  <span className="text-[14px] text-[var(--app-muted)] mb-2 font-medium">/ month usage included</span>
                </div>
              </div>
              <div className="p-6 pt-6 flex-1 flex flex-col justify-end">
                <div className="h-px w-full bg-[var(--app-hairline)] mb-6" />
                <ul className="space-y-4 mb-8 flex-1">
                  {['Everything in the Pro Plan', 'Multiplayer', 'SOC 2', 'Priority support'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="size-5 text-emerald-500 shrink-0" strokeWidth={2} />
                      <span className="text-[14px] text-[var(--app-ink)] font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/signup" className="w-full block text-center rounded-xl py-3 border border-[var(--app-hairline)] bg-[var(--app-soft)] hover:bg-[var(--app-canvas)] text-[var(--app-ink)] font-semibold text-[15px] transition-colors">
                  Join waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>\n\n`;
    
    code = code.substring(0, oldPIdx) + newSection + '      ' + code.substring(mDevsIdx);
}
fs.writeFileSync('src/app/page.tsx', code);
