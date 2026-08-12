const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// The first tab got fixed in fix_syntax.js because it was indeed changed to `</span></button>`.
// However, the second and third tabs were never successfully replaced by fix_page.js,
// so they still say `</span></Link>`.
// Let's replace `</Link>` with `</button>` for these specific instances.

content = content.replace(
  /Cost Governance and Loop Protection \(The Hard Stop\)<\/span><\/Link>/g,
  'Cost Governance and Loop Protection (The Hard Stop)</span></button>'
);

content = content.replace(
  /Human-in-the-Loop \(HITL\) Interruption \(The Dashboard\)<\/span><\/Link>/g,
  'Human-in-the-Loop (HITL) Interruption (The Dashboard)</span></button>'
);

fs.writeFileSync(pagePath, content);
console.log('Fixed remaining unclosed JSX tags in page.tsx');
