const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
code = code.replace(/<img alt loading/g, '<img alt="" loading');
fs.writeFileSync('src/app/page.tsx', code);
