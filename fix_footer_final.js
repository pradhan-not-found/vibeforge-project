const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Revert footer images to local (because https://cofounder.co/footer/ does not exist on their live site, it was an assumption)
page = page.replace(/https:\/\/cofounder\.co\/footer\//g, '/footer/');

// 2. Change "Design by Altalogy" to "Design by Souradeep"
page = page.replace(/Design by <\/span><a href="https:\/\/www\.altalogy\.com\/\?rel=gic-cofounder" target="_blank" rel="noopener noreferrer" className="text-ink-faint no-underline hover:underline">Altalogy<\/a>/g, 'Design by </span><a href="https://souradeep.me" target="_blank" rel="noopener noreferrer" className="text-ink-faint no-underline hover:underline">Souradeep</a>');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Fixed footer image and design by text.");
