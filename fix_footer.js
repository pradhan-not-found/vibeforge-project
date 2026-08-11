const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const footerStart = page.indexOf('<footer');
const footerEnd = page.indexOf('</footer>') + 9;

const newFooter = `
<footer className="w-full bg-surface-darker py-16 relative overflow-hidden">
  <div className="max-w-[1080px] mx-auto px-6 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Left Text Section */}
      <div className="flex flex-col gap-6 items-start">
        <div className="flex items-center gap-[6px] text-ink-faint text-[14px] font-[460] leading-[140%] tracking-[0.12px]">
          Automate with
          <span className="inline-flex items-center gap-[4px] rounded-full bg-surface py-[4px] px-[8px] border border-border-pill">
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M7.08329 4.16667V3.33333C7.08329 2.18274 6.15054 1.25 4.99996 1.25C3.84937 1.25 2.91663 2.18274 2.91663 3.33333V4.16667M4.99996 6.04167V6.875M3.66663 8.75H6.33329C7.03338 8.75 7.38338 8.75 7.65079 8.61375C7.886 8.49392 8.07721 8.30271 8.19704 8.0675C8.33329 7.80008 8.33329 7.45008 8.33329 6.75V6.16667C8.33329 5.46658 8.33329 5.11658 8.19704 4.84917C8.07721 4.61396 7.886 4.42275 7.65079 4.30292C7.38338 4.16667 7.03338 4.16667 6.33329 4.16667H3.66663C2.96656 4.16667 2.61653 4.16667 2.34914 4.30292C2.11393 4.42275 1.92271 4.61396 1.80287 4.84917C1.66663 5.11658 1.66663 5.46658 1.66663 6.16667V6.75C1.66663 7.45008 1.66663 7.80008 1.80287 8.0675C1.92271 8.30271 2.11393 8.49392 2.34914 8.61375C2.61653 8.75 2.96656 8.75 3.66663 8.75Z" stroke="#BFBFBF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold text-ink-muted text-[11px]">SOC 2</span>
          </span>
          compliant security
        </div>
        
        <p className="text-ink-muted text-[13px] font-[460] leading-[140%] tracking-[0.12px]">
          Copyright © 2026 Checkpost Security Of New York
        </p>
        
        <p className="text-ink-muted text-[13px] font-[460] leading-[140%] tracking-[0.12px]">
          Design by <a href="https://sourodeep.me" target="_blank" rel="noopener noreferrer" className="text-ink hover:underline font-semibold">Sourodeep</a>
        </p>

        <div className="flex items-center gap-[6px] mt-4 text-ink-faint text-[12px] font-[460] leading-[140%] tracking-[0.12px]">
          <span>Made with</span>
          <svg width="14" height="14" viewBox="0 0 11 11" fill="none"><g filter="url(#filter0_i_698_9835)"><path d="M10.8643 6.22461H9.3125V7.77246H7.7627V9.31641H6.20898V10.8477H4.6543V9.31641H3.11035V7.76172H4.66406V9.29297H6.20801V7.76172H7.75781V6.21777H9.30957V1.56152H10.8643V6.22461ZM1.55469 6.21777H3.1084V7.77246H1.55371V6.22461H0V1.56152H1.55469V6.21777ZM4.66309 1.54297H6.20312V0H9.3125V1.55469H6.20898V3.09766H4.6543V1.55469H1.55371V0H4.66309V1.54297Z" fill="#549F4B" /></g></svg>
          <span>by Fantastic 4</span>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-border-card bg-surface" data-tilt-factor="0.2">
        <div className="aspect-[4/3] w-full relative">
          <img src="/footer/img-footer-1.avif" alt="Checkpost product preview" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
            <p className="text-white text-lg md:text-xl font-medium drop-shadow-md">
              Secure your autonomous agents.
            </p>
            <a href="/dashboard" className="mt-4 inline-block bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              View Dashboard
            </a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</footer>
`;
page = page.substring(0, footerStart) + newFooter + page.substring(footerEnd);
fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed footer');
