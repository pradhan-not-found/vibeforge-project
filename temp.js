const fs = require('fs');
const page = fs.readFileSync('src/app/page.tsx', 'utf8');
const headerStart = page.indexOf('<header');
const headerEnd = page.indexOf('</header>') + 9;
console.log(page.substring(headerStart, headerEnd));
