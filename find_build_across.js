const fs = require('fs');
const page = fs.readFileSync('src/app/page.tsx', 'utf8');
const searchStr = 'Build across industries';
const idx = page.indexOf(searchStr);
if (idx !== -1) {
    console.log("Found at", idx);
    console.log(page.substring(idx - 100, idx + 200));
} else {
    console.log("Not found");
}
