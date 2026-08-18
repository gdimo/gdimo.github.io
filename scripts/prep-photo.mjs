#!/usr/bin/env node
// Prepare a photo for the web gallery: auto-rotate per EXIF, resize to max
// 1800px on the long edge, re-encode as quality-82 JPEG, and strip all
// metadata (EXIF/GPS). Usage:
//   node scripts/prep-photo.mjs <input> <output.jpg>
import sharp from 'sharp';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/prep-photo.mjs <input> <output.jpg>');
  process.exit(1);
}

const image = sharp(input).rotate();
const { width, height } = await image.metadata();
await image
  .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);

const out = await sharp(output).metadata();
console.log(`${output}: ${out.width}x${out.height} (from ${width}x${height})`);
