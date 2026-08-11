const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix footer images globally
page = page.replace(/\/footer\//g, 'https://cofounder.co/footer/');

// 2. Fix the Meet the Devs background
page = page.replace(/bg-surface(?=">\s*<img src="\/teams\/)/g, 'bg-white');
// Wait, the images might have already been modified. Let's just do a specific replace for the classes:
page = page.replace(/className="w-24 h-24 rounded-full overflow-hidden border border-border-pill shadow-sm shrink-0 bg-surface"/g, 'className="w-24 h-24 rounded-full overflow-hidden border border-border-pill shadow-sm shrink-0 bg-white"');

// 3. Fix the Checkpost text in the diagram
// Let's find the exact string that is there.
const checkpostRegex = /<span style=\{\s*\{\s*fontSize:\s*"16px",\s*fontWeight:\s*"bold",\s*color:\s*"black",\s*fontFamily:\s*"monospace"\s*\}\s*\}>Checkpost<\/span>/g;
page = page.replace(checkpostRegex, '<span style={ { fontSize: "11px", fontWeight: "bold", color: "black", fontFamily: "var(--font-geist-pixel-grid, monospace)", display: "inline-block", transform: "scale(1.2)" } }>Checkpost</span>');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Replacements applied!");
