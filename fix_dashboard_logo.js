const fs = require('fs');
let layout = fs.readFileSync('src/app/dashboard/layout.tsx', 'utf8');

const targetStr = `            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-6 h-6 rounded bg-lime-300 border border-[rgba(0,0,0,0.1)] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <span className="text-ink" style={{ fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold", fontSize: "1.25rem" }}>Checkpost</span>
            </Link>`;

const replaceStr = `            <Link href="/" className="inline-flex items-center mb-8">
              <span className="text-ink" style={{ fontFamily: "var(--font-geist-pixel-grid, monospace)", fontWeight: "bold", fontSize: "1.25rem" }}>Checkpost</span>
            </Link>`;

layout = layout.replace(targetStr, replaceStr);
fs.writeFileSync('src/app/dashboard/layout.tsx', layout);
console.log("Removed SVG from dashboard layout.");
