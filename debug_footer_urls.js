const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

let footerIdx = page.indexOf('<footer');
if (footerIdx !== -1) {
    let footerHTML = page.substring(footerIdx);
    
    // Find all background-images or url()
    let urlRegex = /url\([^)]+\)/g;
    let match;
    console.log("URLs in footer:");
    while ((match = urlRegex.exec(footerHTML)) !== null) {
        console.log(match[0]);
    }
}
