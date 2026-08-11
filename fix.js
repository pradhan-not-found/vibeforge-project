const fs = require('fs');
let lines = fs.readFileSync('d:/New folder (2)/Trustworthy/src/pages/dashboard/Agents.tsx', 'utf-8').split(/\r?\n/);

let out = ['"use client";'];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Component Name
  line = line.replace('export default function Agents()', 'export default function Page()');
  
  // Imports
  line = line.replace(/\.\.\/\.\.\/components\//g, '@/components/');
  line = line.replace(/\.\.\/\.\.\/context\//g, '@/context/');
  line = line.replace(/\.\.\/\.\.\/lib\//g, '@/lib/');

  // Skip supabase import
  if (line.includes('import { supabase }')) continue;

  // fetchAgents
  if (line.includes('const fetchAgents = async () => {')) {
    out.push(line);
    out.push('    if (!user?.email) return;');
    out.push('    try {');
    out.push('      setLoading(true);');
    out.push('      const response = await fetch(`http://localhost:8000/api/agents?user_id=${user.email}`);');
    out.push('      if (!response.ok) throw new Error(\'API error\');');
    out.push('      const data = await response.json();');
    out.push('      if (data) {');
    
    // skip lines until 'if (data) {'
    while (!lines[i].includes('if (data) {')) {
      i++;
    }
    continue;
  }

  // handleDeleteAgent
  if (line.includes('const handleDeleteAgent = async (id: string) => {')) {
    out.push(line);
    out.push('    try {');
    out.push('      const response = await fetch(`http://localhost:8000/api/agents/${id}`, { method: \'DELETE\' });');
    out.push('      if (!response.ok) throw new Error(\'Delete failed\');');
    out.push('      setAgents(agents.filter(a => a.id !== id));');
    
    // skip lines until 'setAgents(agents.filter'
    while (!lines[i].includes('setAgents(agents.filter')) {
      i++;
    }
    continue;
  }

  out.push(line);
}

fs.writeFileSync('d:/New folder (2)/vibeforge/src/app/dashboard/agents/page.tsx', out.join('\n'));
