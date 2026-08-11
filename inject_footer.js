const fs = require('fs');

const contentPath = 'C:\\Users\\SOURADEEP\\.gemini\\antigravity-ide\\brain\\e96df99e-34c7-4484-8bcb-0a6ff64a97cd\\.system_generated\\steps\\399\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const footerStart = content.lastIndexOf('<footer');
const footerEnd = content.lastIndexOf('</footer>') + 9;
let rawFooter = content.substring(footerStart, footerEnd);

// Convert standard HTML to JSX
let jsxFooter = rawFooter
    .replace(/class=/g, 'className=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/color-interpolation-filters=/g, 'colorInterpolationFilters=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/srcset=/g, 'srcSet=');

// Fix style tags. In React, style must be an object.
// A simple hack is to convert `style="margin-top: 10px;"` into `style={{margin-top: "10px"}}` which is still invalid React, 
// so we cast to `as any` or we just replace style="([^"]*)" with `style={ {"cssText": "$1"} as any }` which might not work.
// Better hack: `style={ {"some":"hack"} as any }`? No, let's use a regex to parse inline styles.
jsxFooter = jsxFooter.replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = {};
    styles.split(';').forEach(rule => {
        if (!rule.trim()) return;
        let [key, ...valParts] = rule.split(':');
        if (!key || valParts.length === 0) return;
        let camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[camelKey] = valParts.join(':').trim();
    });
    return `style={ ${JSON.stringify(styleObj)} as any }`;
});

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
const pageFooterStart = page.lastIndexOf('<footer');
const pageFooterEnd = page.lastIndexOf('</footer>') + 9;

page = page.substring(0, pageFooterStart) + jsxFooter + page.substring(pageFooterEnd);
fs.writeFileSync('src/app/page.tsx', page);
console.log('Successfully injected cofounder.co footer');
