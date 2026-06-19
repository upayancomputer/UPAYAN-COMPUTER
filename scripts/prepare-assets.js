import fs from 'fs';
import path from 'path';

const sourceImg = 'src/assets/images/blue_neon_favicon_1781848893144.jpg';
const filesToCreate = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (fs.existsSync(sourceImg)) {
  for (const filename of filesToCreate) {
    fs.copyFileSync(sourceImg, path.join(publicDir, filename));
  }
  console.log('Favicon set and PWA icon copies created successfully in /public.');
} else {
  console.warn(`Warning: source image ${sourceImg} not found.`);
}
