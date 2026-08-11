const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Revert the objectPosition for Aniruddha Das
page = page.replace(
    '<img src="/teams/anirudhhadas.png" alt="Aniruddha Das" className="w-full h-full object-cover" style={{ objectPosition: "center 15px" }} />',
    '<img src="/teams/anirudhhadas.png" alt="Aniruddha Das" className="w-full h-full object-cover" />'
);

fs.writeFileSync('src/app/page.tsx', page);
console.log("Reverted Aniruddha's image position.");
