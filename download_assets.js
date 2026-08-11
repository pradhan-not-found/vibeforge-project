const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'build-ui-bits');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const files = [
  'section-bg.avif',
  'left-decor.png',
  'right-top-decor.png',
  'right-bottom-decor.png',
  'right-small-decor.png',
  'clouds-left.png',
  'clouds-right.png',
  'carousel-top.png',
  'carousel-bottom.png'
];

files.forEach(file => {
  const url = `https://cofounder.co/build-ui-bits/${file}`;
  const dest = path.join(dir, file);
  const fileStream = fs.createWriteStream(dest);
  https.get(url, response => {
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${file}`);
    });
  }).on('error', err => {
    fs.unlink(dest, () => {});
    console.error(`Error downloading ${file}:`, err.message);
  });
});
