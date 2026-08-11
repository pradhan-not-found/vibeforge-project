const fs = require('fs');
const page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find all Checkpost occurrences up to index 150000
let idx = page.indexOf('Checkpost');
while (idx !== -1 && idx < 150000) {
    console.log(`\n--- Match at ${idx} ---`);
    console.log(page.substring(idx - 100, idx + 100));
    idx = page.indexOf('Checkpost', idx + 1);
}
