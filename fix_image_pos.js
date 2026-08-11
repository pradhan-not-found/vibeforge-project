const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(
    '<img src="/teams/anirudhhadas.png" alt="Aniruddha Das" className="w-full h-full object-cover" />',
    '<img src="/teams/anirudhhadas.png" alt="Aniruddha Das" className="w-full h-full object-cover" style={{ objectPosition: "center 15px" }} />'
);

fs.writeFileSync('src/app/page.tsx', page);
console.log("Adjusted image position");
