const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// replace HTML comments <!-- ... --> with empty strings or JSX comments
page = page.replace(/<!--[\s\S]*?-->/g, '');

// Also check for unclosed img tags
page = page.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
page = page.replace(/<br>/g, '<br />');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed JSX errors');
