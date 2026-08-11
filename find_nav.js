const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Print first 2000 chars of LandingPage return to see the top of the page
const idx = page.indexOf('return (');
if (idx > -1) {
    console.log(page.substring(idx, idx + 2000));
}
