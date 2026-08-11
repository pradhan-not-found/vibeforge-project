const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

let match;
let regex = /.{0,20}\/footer\/.{0,20}/g;
while ((match = regex.exec(page)) !== null) {
    console.log(match[0]);
}
