const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const foreignIdx = page.indexOf('<foreignObject');
if (foreignIdx !== -1) {
    const endForeign = page.indexOf('</foreignObject>', foreignIdx);
    let slice = page.substring(foreignIdx, endForeign + 16);
    console.log("Original SVG text:", slice);
    
    // We want to replace the span that contains Checkpost
    const regex = /<span [^>]+>Checkpost<\/span>/g;
    slice = slice.replace(regex, '<span style={ { fontSize: "11px", fontWeight: "bold", color: "black", fontFamily: "var(--font-geist-pixel-grid, monospace)" } }>Checkpost</span>');
    console.log("New SVG text:", slice);
    
    page = page.substring(0, foreignIdx) + slice + page.substring(endForeign + 16);
    fs.writeFileSync('src/app/page.tsx', page);
}
