const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

let target = '<span style={ { fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "monospace" } }>Checkpost</span>';
if (page.includes(target)) {
    page = page.replace(target, '<span style={ { fontSize: "11px", fontWeight: "bold", color: "black", fontFamily: "var(--font-geist-pixel-grid, monospace)", display: "inline-block", transform: "scale(1.2)" } }>Checkpost</span>');
    console.log("Replaced using string match!");
} else {
    console.log("Still not found!");
}

fs.writeFileSync('src/app/page.tsx', page);
