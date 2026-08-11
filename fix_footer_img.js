const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(
    'src="/footer/img-footer-1.avif"',
    'src="https://cofounder.co/footer/img-footer-1.avif"'
);
page = page.replace(
    'url(/footer/Holo-bg-card.png)',
    'url(https://cofounder.co/footer/Holo-bg-card.png)'
);

fs.writeFileSync('src/app/page.tsx', page);
console.log("Updated footer image URLs to absolute");
