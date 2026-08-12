const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Remove the new Pricing component import and tag
content = content.replace('import Pricing from "@/components/Pricing";\r\n', '');
content = content.replace('import Pricing from "@/components/Pricing";\n', '');
content = content.replace('      <Pricing />\r\n', '');
content = content.replace('      <Pricing />\n', '');

// 2. Fix the line 1769 (the long line with pricing cards)
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('pricing-card-group group relative flex')) {
    let line = lines[i];

    // Image paths
    line = line.replace(/%2Fpricing%2FFree\.avif/g, '%2Fassets%2Fpricing%2FFree.avif');
    line = line.replace(/%2Fpricing%2FPro\.avif/g, '%2Fassets%2Fpricing%2FPro.avif');
    line = line.replace(/%2Fpricing%2FTeam\.avif/g, '%2Fassets%2Fpricing%2FTeam.avif');

    // Alt texts
    line = line.replace(/Cofounder Free Trial plan preview/g, 'Checkpost Free Trial plan preview');
    line = line.replace(/Cofounder Pro plan preview/g, 'Checkpost Pro plan preview');
    line = line.replace(/Cofounder Team Plan preview/g, 'Checkpost Team Plan preview');

    // General texts
    line = line.replace(/Cofounder Pro/g, 'Checkpost Pro');
    line = line.replace(/7 days of Cofounder Pro/g, '7 days of Checkpost Pro'); // Might be redundant but safe
    
    // Feature replacements (need to be careful with multiples)
    // Free plan features
    line = line.replace('Access to multiple AI models</span></li><li', 'Monitor single agent</span></li><li');
    line = line.replace('Agent-built previews</span></li><li', 'Real-time policy evaluation</span></li><li');
    line = line.replace('Preview environments</span></li></ul>', 'Basic Audit Logs</span></li></ul>');

    // Pro plan features (since the first Access to multiple AI models is replaced, the next one is in Pro)
    line = line.replace('Access to multiple AI models</span></li><li', 'Support for multiple agents</span></li><li');
    line = line.replace('Domain purchasing and hosting</span></li><li', 'Custom policy enforcement</span></li><li');
    line = line.replace('Agent inboxes</span></li><li', 'Threat simulation</span></li><li');
    line = line.replace('Graduate data from the platform</span></li></ul>', 'Advanced Analytics</span></li></ul>');

    // Team plan features
    line = line.replace('Multiplayer</span></li><li', 'Multi-tenant support</span></li><li');
    // For SOC 2, be careful not to replace it if it's already SOC 2
    line = line.replace('SOC 2</span></li><li', 'SOC 2 Compliance</span></li><li');
    // Wait, the original was "SOC 2", Checkpost wants "SOC 2 Compliance"

    lines[i] = line;
  }
}

fs.writeFileSync(pagePath, lines.join('\n'));
console.log('Fixed page.tsx');
