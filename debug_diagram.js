const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let idx = page.indexOf('Checkpost');
let matches = [];
while (idx !== -1) {
    let context = page.substring(Math.max(0, idx - 100), Math.min(page.length, idx + 100));
    // Filter out obvious ones like the logo, paragraph text, etc.
    if (context.includes('font-size') || context.includes('fontSize') || context.includes('<text') || context.includes('foreignObject') || context.includes('translate(')) {
        matches.push(context);
    }
    idx = page.indexOf('Checkpost', idx + 1);
}
console.log(`Found ${matches.length} possible diagram nodes.`);
matches.forEach((m, i) => {
    console.log(`\n--- Match ${i} ---`);
    console.log(m);
});
