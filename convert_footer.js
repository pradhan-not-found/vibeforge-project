const fs = require('fs');

// Extract footer from content.md
const contentPath = 'C:\\Users\\SOURADEEP\\.gemini\\antigravity-ide\\brain\\e96df99e-34c7-4484-8bcb-0a6ff64a97cd\\.system_generated\\steps\\399\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');
const footerStart = content.lastIndexOf('<footer');
const footerEnd = content.lastIndexOf('</footer>') + 9;
let footerHtml = content.substring(footerStart, footerEnd);

// Fix some React issues in the raw HTML footer (class -> className, style strings -> style objects, etc.)
// Wait, doing this safely via regex is hard. Let's just fix the most common ones.
footerHtml = footerHtml.replace(/class=/g, 'className=');
footerHtml = footerHtml.replace(/for=/g, 'htmlFor=');
// Remove style="..." or try to convert. The footer has style="...". 
// Actually, it's easier to just use dangerouslySetInnerHTML for the exact footer, OR run a quick conversion.
// Let's use a wrapper with dangerouslySetInnerHTML to guarantee EXACT rendering without React complaining about style strings.
// But wait, the user wants it professional and editable.
// Let's see if we can just regex the style attributes.
