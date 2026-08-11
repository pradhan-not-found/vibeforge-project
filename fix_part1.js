const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix Checkpost overflow diagram node
// The match is at ~23860: `<span style={ { fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "monospace" } }>Checkpost</span>`
page = page.replace(
    '<span style={ { fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "monospace" } }>Checkpost</span>',
    '<span style={ { fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "var(--font-geist-pixel-grid, monospace)", letterSpacing: "-1px" } }>Checkpost</span>'
);

// We should also check the width of the foreignObject or the div wrapping it.
// The SVG node has `<foreignObject x="200" y="271" width="120" height="58">` probably? Let's not touch SVG width unless needed, maybe letterSpacing will fix the width.

// 2. Find "Build across industries" section boundaries
const buildAcrossIdx = page.indexOf('Build across industries');
if (buildAcrossIdx !== -1) {
    // Find the enclosing div for this section. In the original cofounder site, the sections usually have clear wrapping divs.
    // Let's find the nearest preceding `<div data-guide-section="true"` or `<div className="w-full bg-surface` or similar.
    let startIdx = page.lastIndexOf('<div data-guide-section="true"', buildAcrossIdx);
    if (startIdx === -1) startIdx = page.lastIndexOf('<div className="relative w-full', buildAcrossIdx);
    if (startIdx === -1) startIdx = page.lastIndexOf('<div', buildAcrossIdx);
    
    // Actually, let's just find the start of the section by looking backwards for the closest `w-full bg-surface` or similar.
    // Let's just find the last `<div className="w-full bg-surface flex flex-col items-center pt-[32px] pb-[72px]` NO, that's social proof.
    // Let's print out the context around `buildAcrossIdx` to identify the best container.
    console.log("Context around Build across industries:");
    console.log(page.substring(buildAcrossIdx - 2000, buildAcrossIdx + 2000));
}

