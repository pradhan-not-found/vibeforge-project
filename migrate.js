const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\New folder (2)\\Trustworthy\\src\\pages\\dashboard';
const destDir = 'd:\\New folder (2)\\vibeforge\\src\\app\\dashboard';
const componentsSrc = 'd:\\New folder (2)\\Trustworthy\\src\\components';
const componentsDest = 'd:\\New folder (2)\\vibeforge\\src\\components';
const libSrc = 'd:\\New folder (2)\\Trustworthy\\src\\lib';
const libDest = 'd:\\New folder (2)\\vibeforge\\src\\lib';
const contextSrc = 'd:\\New folder (2)\\Trustworthy\\src\\context';
const contextDest = 'd:\\New folder (2)\\vibeforge\\src\\context';
const publicSrc = 'd:\\New folder (2)\\Trustworthy\\public\\ai-logos';
const publicDest = 'd:\\New folder (2)\\vibeforge\\public\\ai-logos';

// Copy components
fs.mkdirSync(componentsDest, { recursive: true });
['MotionCard.tsx', 'MiniSparkline.tsx'].forEach(file => {
  if (fs.existsSync(path.join(componentsSrc, file))) {
    let content = fs.readFileSync(path.join(componentsSrc, file), 'utf-8');
    content = `"use client";\n` + content;
    fs.writeFileSync(path.join(componentsDest, file), content);
  }
});

// Copy ai-logos
if (fs.existsSync(publicSrc)) {
  fs.mkdirSync(publicDest, { recursive: true });
  fs.readdirSync(publicSrc).forEach(file => {
    fs.copyFileSync(path.join(publicSrc, file), path.join(publicDest, file));
  });
}

// Ensure auth and supabase context exist
fs.mkdirSync(contextDest, { recursive: true });
if (fs.existsSync(path.join(contextSrc, 'AuthContext.tsx'))) {
  let content = fs.readFileSync(path.join(contextSrc, 'AuthContext.tsx'), 'utf-8');
  content = `"use client";\n` + content;
  fs.writeFileSync(path.join(contextDest, 'AuthContext.tsx'), content);
}

fs.mkdirSync(libDest, { recursive: true });
if (fs.existsSync(path.join(libSrc, 'supabase.ts'))) {
  fs.copyFileSync(path.join(libSrc, 'supabase.ts'), path.join(libDest, 'supabase.ts'));
}

// Convert pages
const pages = [
  { file: 'Agents.tsx', folder: 'agents' },
  { file: 'AuditLogs.tsx', folder: 'logs' },
  { file: 'Dashboard.tsx', folder: '' },
  { file: 'Policies.tsx', folder: 'policies' },
  { file: 'Settings.tsx', folder: 'settings' },
  { file: 'ThreatLog.tsx', folder: 'threats' },
  { file: 'Tokens.tsx', folder: 'tokens' },
];

pages.forEach(page => {
  const sourcePath = path.join(srcDir, page.file);
  if (!fs.existsSync(sourcePath)) return;
  
  let content = fs.readFileSync(sourcePath, 'utf-8');
  
  // Transform into a Client Component since React hooks are heavily used
  content = `"use client";\n` + content;
  
  // Change export default function Name() -> export default function Page()
  content = content.replace(/export default function \w+\s*\(/g, 'export default function Page(');
  
  // Fix imports
  content = content.replace(/\.\.\/\.\.\/components\//g, '@/components/');
  content = content.replace(/\.\.\/\.\.\/context\//g, '@/context/');
  content = content.replace(/\.\.\/\.\.\/lib\//g, '@/lib/');
  content = content.replace(/\.\.\/components\//g, '@/components/');
  content = content.replace(/\.\.\/context\//g, '@/context/');
  content = content.replace(/\.\.\/lib\//g, '@/lib/');

  const targetFolder = page.folder ? path.join(destDir, page.folder) : destDir;
  fs.mkdirSync(targetFolder, { recursive: true });
  fs.writeFileSync(path.join(targetFolder, 'page.tsx'), content);
});

console.log("Migration complete!");
