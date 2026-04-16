/**
 * Convertit toutes les images sous apps/web/public/images en .webp.
 * Conserve les originaux dans un sous-dossier `_originals/` (déplacés, pas copiés).
 *
 * Usage : node scripts/convert-images-to-webp.mjs
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES = path.resolve(__dirname, '..', 'apps', 'web', 'public', 'images');

const CONVERTIBLE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.jfif', '.gif', '.tiff', '.bmp']);
const SKIP_DIRS = new Set(['_originals']);

/** @type {{ path: string; from: string; to: string; bytes: number; newBytes: number }[]} */
const converted = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!CONVERTIBLE_EXTS.has(ext)) continue;

    const base = entry.name.slice(0, entry.name.length - ext.length);
    const outPath = path.join(dir, `${base}.webp`);

    const origStat = await fs.stat(full);
    await sharp(full).webp({ quality: 82 }).toFile(outPath);
    const newStat = await fs.stat(outPath);

    // Déplacer l'original dans _originals/
    const originalsDir = path.join(dir, '_originals');
    await fs.mkdir(originalsDir, { recursive: true });
    await fs.rename(full, path.join(originalsDir, entry.name));

    converted.push({
      path: path.relative(PUBLIC_IMAGES, outPath).replace(/\\/g, '/'),
      from: ext,
      to: '.webp',
      bytes: origStat.size,
      newBytes: newStat.size,
    });
  }
}

await walk(PUBLIC_IMAGES);

if (converted.length === 0) {
  console.log('Aucune image à convertir.');
  process.exit(0);
}

console.log('Conversions :');
let totalBefore = 0;
let totalAfter = 0;
for (const c of converted) {
  totalBefore += c.bytes;
  totalAfter += c.newBytes;
  const ratio = ((1 - c.newBytes / c.bytes) * 100).toFixed(1);
  console.log(
    `  ${c.path}  ${(c.bytes / 1024).toFixed(0)}KB → ${(c.newBytes / 1024).toFixed(0)}KB  (-${ratio}%)`,
  );
}
const totalRatio = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(
  `\nTotal : ${(totalBefore / 1024).toFixed(0)}KB → ${(totalAfter / 1024).toFixed(0)}KB  (-${totalRatio}%)`,
);
console.log(`\nOriginaux déplacés dans les sous-dossiers \`_originals/\`.`);
