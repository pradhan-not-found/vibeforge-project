const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('d:/New folder (2)/vibeforge/public/clone.html', 'utf8');
const $ = cheerio.load(html);

// Remove scripts and styles to avoid syntax errors
$('script').remove();
$('style').remove();
$('noscript').remove();
$('link').remove();

// We want the Header, Hero, and Footer. 
// The original site is structured with a lot of nested divs.
// Let's just grab the whole body content, but remove the long lists of text that aren't needed.

const body = $('body');

// Clean up attributes
$('*').each((i, el) => {
  if (el.attribs) {
    if (el.attribs.class) {
      el.attribs.className = el.attribs.class;
      delete el.attribs.class;
    }
    if (el.attribs.for) {
      el.attribs.htmlFor = el.attribs.for;
      delete el.attribs.for;
    }
    if (el.attribs.style) {
      // Just delete inline styles to avoid React errors for now, or convert them roughly
      delete el.attribs.style;
    }
    // Remove attributes that break React
    delete el.attribs['xmlns:xlink'];
    delete el.attribs['xml:space'];
    delete el.attribs['stroke-width']; // would need strokeWidth
    delete el.attribs['stroke-linecap'];
    delete el.attribs['stroke-linejoin'];
    delete el.attribs['fill-rule'];
    delete el.attribs['clip-rule'];
    delete el.attribs['vector-effect'];
    
    // Convert some common svg attrs
    if (el.attribs['viewbox']) {
      el.attribs.viewBox = el.attribs['viewbox'];
      delete el.attribs['viewbox'];
    }
  }
});

let cleanHtml = body.html();

// Further manual JSX fixes
cleanHtml = cleanHtml.replace(/<!--[\s\S]*?-->/g, ''); // remove comments
cleanHtml = cleanHtml.replace(/<br>/gi, '<br />');
cleanHtml = cleanHtml.replace(/<hr>/gi, '<hr />');
cleanHtml = cleanHtml.replace(/<img([^>]+?)>/gi, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});
cleanHtml = cleanHtml.replace(/<input([^>]+?)>/gi, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});

// Replace text to fit "Checkpost"
cleanHtml = cleanHtml.replace(/Cofounder/g, 'Checkpost');
cleanHtml = cleanHtml.replace(/The General Intelligence Company/gi, 'Checkpost Security');
cleanHtml = cleanHtml.replace(/Run a company/gi, 'Secure your Agents');
cleanHtml = cleanHtml.replace(/Hire an agent/gi, 'View Dashboard');
cleanHtml = cleanHtml.replace(/Designed to run an entire business/gi, 'Web Application Firewall for Autonomous AI Agents');

const component = `
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-surface min-h-screen text-ink">
      ${cleanHtml}
    </div>
  );
}
`;

fs.writeFileSync('d:/New folder (2)/vibeforge/src/app/page.tsx', component);
console.log('Successfully generated page.tsx');
