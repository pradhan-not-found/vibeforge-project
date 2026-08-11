const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace logo
page = page.replace(
    '<img src="/logo-dark.svg" alt="Checkpost" style={ {"width":"58px","height":"16px"} as any } />',
    '<span className="font-mono font-bold text-black text-xl">Checkpost</span>'
);

// Footer replacements
page = page.replace(
    'by {/*   */}Checkpost Security Of New York',
    'by Fantastic 4'
);

page = page.replace(
    'href="https://www.altalogy.com/?rel=gic-cofounder"',
    'href="https://sourodeep.me"'
);

page = page.replace(
    '>Altalogy</a>',
    '>Sourodeep</a>'
);

// Extra check for Dashboard text (user said: "also the dashboard you need to also change accordingly with this")
// "Run a company" in the footer button was already changed? Wait, no, the button in the footer said "Run a company".
// I didn't replace that one specifically if it was inside the button. Let's fix that too.
page = page.replace(
    '<span className="text-[15px] font-[460] tracking-[0.15px]">Run a company</span>',
    '<span className="text-[15px] font-[460] tracking-[0.15px]">View Dashboard</span>'
);
// Replace any other lingering "Run a company" just in case
page = page.replace(/Run a company/gi, 'View Dashboard');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Replacements completed successfully.');
