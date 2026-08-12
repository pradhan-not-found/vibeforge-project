const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'src/app/docs');
const chapterDir = path.join(__dirname, 'src/app/chapter');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

// Copy
copyFolderSync(docsDir, chapterDir);

// Now rewrite layout in chapter
const layoutPath = path.join(chapterDir, 'layout.tsx');
const newLayoutContent = `"use client";
import Link from 'next/link';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-medium text-gray-800 hover:text-black">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </Link>
        <div className="text-sm text-gray-500 font-medium">
          Checkpost Chapter
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-16">
          {children}
        </article>
      </main>
    </div>
  );
}
`;
fs.writeFileSync(layoutPath, newLayoutContent);

console.log('Copied docs to chapter and updated layout');
