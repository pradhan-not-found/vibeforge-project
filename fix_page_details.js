const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix video attributes (autoPlay="" -> autoPlay, etc.)
page = page.replace(/autoPlay=""/g, 'autoPlay');
page = page.replace(/muted=""/g, 'muted');
page = page.replace(/loop=""/g, 'loop');
page = page.replace(/playsInline=""/g, 'playsInline');

// Fix footer image path
page = page.replace(/img footer \(1\)\.avif/g, 'img-footer-1.avif');

// Remove Dashboard link from navbar
// Let's find the Dashboard link in the navbar
const dashboardLinkRegex = /<a[^>]*href="\/dashboard"[^>]*>.*?<\/a>/;
// Wait, the user might have <Link href="/dashboard">
page = page.replace(/<Link[^>]*href="\/dashboard"[^>]*>.*?<\/Link>/, '');
page = page.replace(/<a[^>]*href="\/dashboard"[^>]*>.*?<\/a>/, '');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed video, footer images, and removed dashboard link');
