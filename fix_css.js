const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'app', 'globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Remove all custom scrollbar blocks to avoid conflicts
css = css.replace(/\/\* Custom Scrollbar \*\/[\s\S]*?(?=\/\*|\.pui|$)/g, '');
css = css.replace(/\/\* Custom Professional Scrollbar \*\/[\s\S]*?(?=\/\*|\.pui|$)/g, '');
css = css.replace(/::-webkit-scrollbar[\s\S]*?\}/g, '');
css = css.replace(/\.sidebar-scroll[\s\S]*?\}/g, '');
css = css.replace(/\* \{ scrollbar-width[\s\S]*?\}/g, '');

// Append a single, unified, perfectly flush scrollbar style
const newScrollbarCSS = `
/* Unified Flush Scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(150, 150, 150, 0.3) transparent;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(150, 150, 150, 0.3);
  border-radius: 0px; 
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(150, 150, 150, 0.5);
}

.sidebar-scroll {
  scrollbar-width: thin;
}
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(150, 150, 150, 0.3);
  border-radius: 0px;
}
`;

fs.writeFileSync(cssPath, css + '\n' + newScrollbarCSS);
console.log('Scrollbar CSS cleaned and unified.');
