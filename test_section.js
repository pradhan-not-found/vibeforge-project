const fs = require('fs');
const page = fs.readFileSync('src/app/page.tsx', 'utf8');
const startMatch = page.indexOf('<div className="relative w-full overflow-hidden bg-surface pt-[20px] min-[1100px]:pt-[20px] pb-[80px] min-[768px]:pb-[120px]">');
const endMatch = page.indexOf('<footer');
if (startMatch !== -1 && endMatch !== -1) {
    console.log("Found section! Start:", startMatch, "End:", endMatch);
} else {
    console.log("Section not found", startMatch, endMatch);
}
