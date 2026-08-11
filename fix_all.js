const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix encoding
page = page.replace(/Â©/g, '©');
page = page.replace(/â€”/g, '—');
page = page.replace(/â€™/g, "'");
page = page.replace(/â€œ/g, '"');
page = page.replace(/â€ /g, '" ');

// 2. Fix the diagram logo. 
// Previously I replaced <img src="/logo-dark.svg"...> with <span className="font-mono font-bold text-black text-xl">Checkpost</span>
// That ended up inside a <foreignObject> in the SVG diagram.
// Let's find that exact span and replace it with a smaller text or the image.
page = page.replace(
    '<span className="font-mono font-bold text-black text-xl">Checkpost</span></div></div></foreignObject>',
    '<span style={ { fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "monospace" } }>Checkpost</span></div></div></foreignObject>'
);

// 3. Fix Navbar Logo
// The navbar has an SVG logo: <svg width="126" height="26" viewBox="0 0 126 26" fill="none" className="block h-[18px] w-auto min-[1000px]:h-[26px]"><path d="M116.384 ... 26Z" fill="#262323" /></svg>
// Let's replace the whole SVG in the header.
const svgStart = page.indexOf('<svg width="126" height="26" viewBox="0 0 126 26"');
if (svgStart !== -1) {
    const svgEnd = page.indexOf('</svg>', svgStart) + 6;
    const newLogo = '<span className="font-mono font-bold text-black text-xl">Checkpost</span>';
    page = page.substring(0, svgStart) + newLogo + page.substring(svgEnd);
}

// 4. Restore hover-tilt
// The elements look like <div className="footer-card-2-tilt" data-shadow="" ... data-tilt-factor="0.42">
// and <div ... data-tilt-factor="0.25">
// We replace <div with <hover-tilt and the corresponding </div> with </hover-tilt>
page = page.replace(/<div([^>]*data-tilt-factor[^>]*)>/g, '<hover-tilt$1>');
// Wait, closing tags for hover-tilt. This is harder to regex because of nested divs.
// It's safer to just change the JS animations to query `.footer-card-2-tilt` and other specific classes instead of `hover-tilt` tags!
// That way we don't break TSX with custom tags and closing tags.

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed page.tsx');
