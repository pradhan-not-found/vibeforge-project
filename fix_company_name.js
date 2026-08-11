const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(/The General Intelligence Company Of New York/g, 'Fantastic 4');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Changed company name to Fantastic 4.");
