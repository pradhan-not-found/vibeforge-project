const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the Checkpost span to make it smaller
page = page.replace(
    '<span style={ { fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "var(--font-geist-pixel-grid, monospace)", letterSpacing: "-1px" } }>Checkpost</span>',
    '<span style={ { fontSize: "13px", fontWeight: "bold", color: "black", fontFamily: "var(--font-geist-pixel-grid, monospace)" } }>Checkpost</span>'
);

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed Checkpost size in diagram');
