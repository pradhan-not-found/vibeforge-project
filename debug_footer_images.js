const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

let footerIdx = page.indexOf('<footer');
if (footerIdx !== -1) {
    let footerHTML = page.substring(footerIdx);
    let imgRegex = /<img[^>]+src="([^"]+)"/g;
    let match;
    console.log("Images in footer:");
    while ((match = imgRegex.exec(footerHTML)) !== null) {
        console.log(match[1]);
    }
}
