const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace custom attributes with data- prefix
page = page.replace(/\bshadow=/g, 'data-shadow=');
page = page.replace(/\bscale-factor=/g, 'data-scale-factor=');
page = page.replace(/\bglare-mask=/g, 'data-glare-mask=');
page = page.replace(/\bglare-mask-mode=/g, 'data-glare-mask-mode=');
page = page.replace(/\bglare-intensity=/g, 'data-glare-intensity=');
page = page.replace(/\bglare-hue=/g, 'data-glare-hue=');
page = page.replace(/\bblend-mode=/g, 'data-blend-mode=');
page = page.replace(/\btilt-factor-y=/g, 'data-tilt-factor-y=');
page = page.replace(/\btilt-factor=/g, 'data-tilt-factor=');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed custom attributes');
