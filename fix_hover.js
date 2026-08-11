const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace custom hover-tilt components with standard divs
page = page.replace(/<hover-tilt/g, '<div');
page = page.replace(/<\/hover-tilt>/g, '</div>');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed hover-tilt');
