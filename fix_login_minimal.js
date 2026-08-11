const fs = require('fs');

function updatePage(file, isLogin) {
    let page = fs.readFileSync(file, 'utf8');
    
    // Update text
    page = page.replace('Web Application Firewall dashboard.', 'Agent Orchestration Platform.');
    page = page.replace('secure your autonomous AI agents today.', 'manage your AI agent workforce.');
    
    // Make the background more minimal like app.cofounder.co
    page = page.replace('bg-surface', 'bg-[#FDFDFB]'); // Use their main background color
    page = page.replace('bg-white/60 backdrop-blur-xl border border-white/40', 'bg-white border border-[rgba(0,0,0,0.08)]');
    page = page.replace('shadow-[0_8px_30px_rgb(0,0,0,0.04)]', 'shadow-sm');

    fs.writeFileSync(file, page);
}

updatePage('src/app/login/page.tsx', true);
updatePage('src/app/signup/page.tsx', false);
console.log("Updated login/signup pages to match minimal design.");
