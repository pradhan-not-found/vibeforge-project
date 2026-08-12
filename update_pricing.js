const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const startStr = '<section id="pricing"';
const endStr = '</section>';

let startIdx = code.indexOf(startStr);
if (startIdx !== -1) {
    let endIdx = code.indexOf(endStr, startIdx);
    if (endIdx !== -1) {
        // Add length of endStr to endIdx to include it
        endIdx += endStr.length;
        
        const newPricingSection = '<Pricing />';
        code = code.substring(0, startIdx) + newPricingSection + code.substring(endIdx);
        
        fs.writeFileSync('src/app/page.tsx', code);
        console.log('Successfully replaced pricing section with <Pricing /> component.');
    } else {
        console.log('Could not find </section>');
    }
} else {
    console.log('Could not find <section id="pricing"');
}
