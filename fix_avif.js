const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(/\/footer\/img-footer-1\.avif/g, '/_next/image?url=%2Ffooter%2Fimg-footer-1.avif&w=1920&q=75');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Changed to Next.js optimized image path.");
