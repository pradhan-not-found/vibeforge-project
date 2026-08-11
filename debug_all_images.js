const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

let imgRegex = /<img[^>]+src="(\/[^"]+)"/g;
let match;
console.log("Local images:");
while ((match = imgRegex.exec(page)) !== null) {
    console.log(match[1]);
}
