const fs = require('fs');
const page = fs.readFileSync('src/app/page.tsx', 'utf8');
const indices = [];
let idx = page.indexOf('Checkpost');
while (idx !== -1) {
    indices.push(idx);
    idx = page.indexOf('Checkpost', idx + 1);
}
indices.forEach(i => {
    const start = Math.max(0, i - 150);
    const end = Math.min(page.length, i + 150);
    console.log(`\n--- Match at ${i} ---`);
    console.log(page.substring(start, end));
});
