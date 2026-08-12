const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// I accidentally inserted an extra </span> tag in the replacement.
// I replaced: `</span>The Deterministic Policy Engine (The Rulebook)</span></Link>`
// with: `</span>The Deterministic Policy Engine (The Rulebook)</span></button>`
// Let's fix the extra </span>

content = content.replace(
  /<\/span>The Deterministic Policy Engine \(The Rulebook\)<\/span><\/button>/g,
  'The Deterministic Policy Engine (The Rulebook)</span></button>'
);

content = content.replace(
  /<\/span>Cost Governance and Loop Protection \(The Hard Stop\)<\/span><\/button>/g,
  'Cost Governance and Loop Protection (The Hard Stop)</span></button>'
);

content = content.replace(
  /<\/span>Human-in-the-Loop \(HITL\) Interruption \(The Dashboard\)<\/span><\/button>/g,
  'Human-in-the-Loop (HITL) Interruption (The Dashboard)</span></button>'
);

fs.writeFileSync(pagePath, content);
console.log('Fixed syntax errors in page.tsx');
