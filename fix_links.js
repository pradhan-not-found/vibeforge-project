const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(/href="https:\/\/app\.cofounder\.co"/g, 'href="/signup"');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Replaced app.cofounder.co links with /signup");
