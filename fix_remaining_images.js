const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace logos
page = page.replace(/\/logos\//g, 'https://cofounder.co/logos/');

// Replace decor
page = page.replace(/\/decor\//g, 'https://cofounder.co/decor/');

// Replace _next/image
page = page.replace(/\/_next\/image\?url=/g, 'https://cofounder.co/_next/image?url=');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Replaced remaining missing images.");
