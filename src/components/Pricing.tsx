export default function Pricing() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 flex flex-col items-center border-t border-[var(--app-hairline)]" id="pricing">
      <div className="max-w-[1080px] w-full px-5 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-medium leading-[115%] text-ink mb-4 tracking-tight">
            Start simple. Grow without limits.
          </h2>
          <p className="text-[16px] text-ink-muted max-w-[600px] mx-auto">
            Build and scale without managing the systems behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="flex flex-col bg-white rounded-2xl border border-[var(--app-hairline)] shadow-sm overflow-hidden">
            <img src="/assets/pricing/Free.avif" alt="Checkpost Free Trial plan preview" className="w-full h-auto border-b border-[var(--app-hairline)]" />
            <div className="p-6 flex flex-col flex-1">
              <span className="text-[14px] font-semibold text-ink-muted mb-1">Free Trial</span>
              <h3 className="text-[28px] font-medium text-ink mb-2">Free</h3>
              <p className="text-[14px] text-ink-muted mb-6 h-10">$10 in usage included<br/>7 days of Checkpost Pro</p>
              
              <button className="w-full h-[40px] rounded-lg bg-white border border-[var(--app-hairline)] text-ink font-medium text-[14px] hover:bg-[var(--app-soft)] transition-colors mb-8 shadow-sm">
                Get started
              </button>

              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Monitor single agent</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Real-time policy evaluation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Basic Audit Logs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col bg-white rounded-2xl border-2 border-ink shadow-md overflow-hidden relative">
            <div className="absolute top-4 right-4 bg-ink text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Recommended
            </div>
            <img src="/assets/pricing/Pro.avif" alt="Checkpost Pro plan preview" className="w-full h-auto border-b border-[var(--app-hairline)]" />
            <div className="p-6 flex flex-col flex-1">
              <span className="text-[14px] font-semibold text-ink-muted mb-1">Checkpost Pro</span>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-[28px] font-medium text-ink">$20</span>
                <span className="text-[14px] text-ink-muted mb-1">/month</span>
              </div>
              <p className="text-[14px] text-ink-muted mb-6 h-10">Starting at $20/month usage included</p>
              
              <button className="w-full h-[40px] rounded-lg bg-ink text-white font-medium text-[14px] hover:bg-ink/90 transition-colors mb-8 shadow-sm">
                Get started
              </button>

              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Everything in the Free Plan</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Support for multiple agents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Custom policy enforcement</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Threat simulation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Advanced Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Plan */}
          <div className="flex flex-col bg-white rounded-2xl border border-[var(--app-hairline)] shadow-sm overflow-hidden">
            <img src="/assets/pricing/Team.avif" alt="Checkpost Team Plan preview" className="w-full h-auto border-b border-[var(--app-hairline)]" />
            <div className="p-6 flex flex-col flex-1">
              <span className="text-[14px] font-semibold text-ink-muted mb-1">Team Plan</span>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-[28px] font-medium text-ink">$50</span>
                <span className="text-[14px] text-ink-muted mb-1">/month</span>
              </div>
              <p className="text-[14px] text-ink-muted mb-6 h-10">Coming soon<br/>$50/month usage included</p>
              
              <button className="w-full h-[40px] rounded-lg bg-white border border-[var(--app-hairline)] text-ink font-medium text-[14px] hover:bg-[var(--app-soft)] transition-colors mb-8 shadow-sm">
                Join waitlist
              </button>

              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Everything in the Pro Plan</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Multi-tenant support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">SOC 2 Compliance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[14px] text-ink-muted">Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink mt-0.5 shrink-0">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
