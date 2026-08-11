const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

let match = page.match(/\/footer\//g);
if (match) {
    console.log(`Found ${match.length} occurrences of /footer/!`);
} else {
    console.log("No occurrences of /footer/ found!");
}
