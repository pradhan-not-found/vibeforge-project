const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Replace the header
const headerStart = page.indexOf('<header');
const headerEnd = page.indexOf('</header>') + 9;
const newHeader = `
<header className="site-header sticky top-0 left-0 right-0 z-[201] flex justify-center bg-surface/80 backdrop-blur-md border-b border-border-divider transition-all duration-200">
  <div className="w-full max-w-[1440px] mx-auto px-[20px] min-[476px]:px-[32px] md:px-[20px] py-[16px] flex items-center justify-between">
    <a className="shrink-0 flex items-center" aria-label="Home" href="/">
      <span className="text-black text-3xl md:text-4xl" style={ { fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold" } }>Checkpost</span>
    </a>
    
    <nav className="hidden min-[1000px]:flex items-center gap-[24px]">
      <a className="text-[15px] font-[500] text-ink-muted hover:text-ink transition-colors" href="/login">Log in</a>
      <a className="text-[15px] font-[500] text-ink-muted hover:text-ink transition-colors" href="/signup">Sign up</a>
      <a className="cta-btn-dark px-[16px] py-[10px] rounded-[8px] text-[15px] font-[500] text-on-dark hover:opacity-90 transition-opacity flex items-center justify-center gap-2" href="/dashboard">Dashboard</a>
    </nav>
    <div className="flex items-center min-[1000px]:hidden gap-4">
      <a className="cta-btn-dark px-[16px] py-[10px] rounded-[8px] text-[15px] font-[500] text-on-dark hover:opacity-90 transition-opacity flex items-center justify-center gap-2" href="/dashboard">Dashboard</a>
    </div>
  </div>
</header>
`.trim();
page = page.substring(0, headerStart) + newHeader + page.substring(headerEnd);

// 2. Find the hero graphic (the big SVG) and replace it with a video
// The graphic is in a div right after the main hero text.
// <div className="w-full max-w-[550px] mx-auto min-[1000px]:mr-[-80px] min-[1000px]:mt-[56px] relative z-20 flex justify-center mt-6">
const svgDivStart = page.indexOf('<div className="w-full max-w-[550px] mx-auto min-[1000px]:mr-[-80px]');
if (svgDivStart !== -1) {
    // Find the end of this div. We can just find the next <div className="w-full bg-surface pt-24 pb-10"> or something
    const svgDivEnd = page.indexOf('<div data-guide-section="true"', svgDivStart);
    // Actually the hero section has the diagram inside a div, and then the guide section starts.
    // Let's replace the whole SVG div.
    
    const newVideo = `
<div className="w-full max-w-[650px] mx-auto relative z-20 flex justify-center mt-6 min-[1000px]:mt-[30px] rounded-2xl overflow-hidden" style={ {boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"} }>
  <video className="w-full h-auto rounded-2xl border border-border-pill" autoPlay muted loop playsInline>
    <source src="/hero/cofounder-2-hero.webm" type="video/webm" />
    <source src="/hero/cofounder-2-hero.mp4" type="video/mp4" />
  </video>
</div>
`;
    // We need to carefully replace the old SVG div. Since it's huge, we'll find the start of the next sibling.
    const nextSibling = page.indexOf('<div data-guide-section="true"');
    if (nextSibling !== -1) {
        // Wait, the SVG div and the text are in flex containers.
        // Let's just find the closing tag of the SVG div.
        // The div is <div className="w-full max-w-[550px] mx-auto min-[1000px]:mr-[-80px] min-[1000px]:mt-[56px] relative z-20 flex justify-center mt-6">
        // Let's find exactly the SVG start and end
        const svgTagStart = page.indexOf('<svg width="860" height="710"', svgDivStart);
        if (svgTagStart !== -1) {
            const svgTagEnd = page.indexOf('</svg>', svgTagStart) + 6;
            page = page.substring(0, svgTagStart) + newVideo + page.substring(svgTagEnd);
        }
    }
}

// 3. Move and format the "Checkpost is a WAF" text
// It's currently in the footer.
// Let's remove it from the footer.
const wafText = `<p className="m-0" style={ {"fontSize":"24px","fontWeight":"460","lineHeight":"115%","letterSpacing":"0.24px","textShadow":"0 0 3px rgba(0, 0, 0, 0.08), 0 0.5px 0.5px rgba(0, 0, 0, 0.12)"} as any }><span className="text-white">Checkpost is a Web Application Firewall</span> <span style={ {"backgroundImage":"linear-gradient(180deg, rgba(255, 255, 255, 0.80) -0.93%, rgba(255, 255, 255, 0.64) 104.17%)","backgroundClip":"text","WebkitBackgroundClip":"text","WebkitTextFillColor":"transparent"} as any }>designed to run an entire business.</span></p>`;
// We want to remove this from the footer and put it in the hero.
page = page.replace(wafText, '');

// Put it in the hero right before the video.
// In the hero, there is the main H1: <h1 className="m-0 text-[48px]...
// and a paragraph: <p className="m-0 text-[18px] ...
// Let's add the WAF text right under the paragraph.
const heroP = '<p className="m-0 text-[18px] min-[1000px]:text-[20px] font-normal leading-[135%] tracking-[0.2px] text-ink-muted max-w-[480px]">Automate complex workflows with AI agents that have full access to your codebase, APIs, and cloud infrastructure.</p>';
const newHeroText = `
<div className="mt-8 mb-4 p-6 rounded-2xl" style={ { background: "linear-gradient(145deg, rgba(38,35,35,0.03) 0%, rgba(38,35,35,0.01) 100%)", border: "1px solid rgba(38,35,35,0.05)"} }>
  <h2 className="m-0 text-[24px] md:text-[28px] font-[500] leading-[120%] tracking-tight text-ink">
    <span className="font-bold text-black" style={ {fontFamily: "var(--font-geist-pixel-grid, monospace)"} }>Checkpost</span> is a Web Application Firewall designed to secure your autonomous AI agents.
  </h2>
</div>
`;
page = page.replace(heroP, heroP + newHeroText);

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed page.tsx');
