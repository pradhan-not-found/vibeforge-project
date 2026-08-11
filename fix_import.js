const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Image from 'next/image';");

fs.writeFileSync('src/app/page.tsx', page);
console.log("Added next/image import.");
