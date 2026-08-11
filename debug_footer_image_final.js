const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /\/footer\/img-footer-1.avif/g;
let match;
console.log("Checking footer image src:");
while ((match = regex.exec(page)) !== null) {
    console.log(match[0]);
}
