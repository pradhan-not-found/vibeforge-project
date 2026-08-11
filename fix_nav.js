const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(
    '<header className="site-header sticky top-0 left-0 right-0 z-[201] flex justify-center bg-surface/80 backdrop-blur-md border-b border-border-divider transition-all duration-200">',
    '<header id="site-header" className="site-header fixed top-0 left-0 right-0 z-[201] flex justify-center bg-transparent border-b border-transparent transition-all duration-300 ease-in-out">'
);
fs.writeFileSync('src/app/page.tsx', page);

let anim = fs.readFileSync('public/animations.js', 'utf8');
const newAnim = `
  // Sticky Navbar Scroll Effect
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-white/80', 'backdrop-blur-md', 'border-border-divider');
        header.classList.remove('bg-transparent', 'border-transparent');
      } else {
        header.classList.remove('bg-white/80', 'backdrop-blur-md', 'border-border-divider');
        header.classList.add('bg-transparent', 'border-transparent');
      }
    });
  }
});
`;
anim = anim.replace('});', newAnim);
fs.writeFileSync('public/animations.js', anim);

console.log('Fixed navbar scroll effect');
