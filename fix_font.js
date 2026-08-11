const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the navbar logo span
page = page.replace(
    '<span className="font-mono font-bold text-black text-xl">Checkpost</span>',
    '<span className="text-black text-xl" style={ { fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold" } }>Checkpost</span>'
);

// wait, let's also fix the dashboard pages if they exist because the user said "also the dashboard you need to also change accordingly with this"
// The dashboard layout or page might have the logo too.
fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed page.tsx logo font');
