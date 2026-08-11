const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Ensure next/image is imported
if (!page.includes('import Image from "next/image"')) {
    page = page.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";');
}

// Replace the two occurrences of img-footer-1.avif img tags with next/image
// They currently look like:
// <img src="/_next/image?url=%2Ffooter%2Fimg-footer-1.avif&w=1920&q=75" alt="Cofounder product preview" loading="lazy" className="w-full h-full block rounded-[8px] object-cover"/>
page = page.replace(/<img src="\/_next\/image\?url=%2Ffooter%2Fimg-footer-1\.avif&w=1920&q=75" alt="Cofounder product preview" loading="lazy" className="w-full h-full block rounded-\[8px\] object-cover"\/>/g, '<Image src="/footer/img-footer-1.avif" alt="Cofounder product preview" width={600} height={400} className="w-full h-full block rounded-[8px] object-cover"/>');

fs.writeFileSync('src/app/page.tsx', page);
console.log("Replaced with Next.js Image component.");
