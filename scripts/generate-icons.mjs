// Genera favicon, icone e immagine social di default a partire da brand/logo-asca.png.
// Da rilanciare solo se cambia il logo: npm run icone
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const LOGO = 'brand/logo-asca.png';
const NAVY = '#04122c';

// Logo centrato su un quadrato blu notte (per icona Apple e Android).
async function squareIcon(size, logoSize, file) {
  const logo = await sharp(LOGO).resize(logoSize, logoSize).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toFile(file);
}

// favicon.ico: un file ICO che contiene il PNG 32x32 del logo (sfondo trasparente).
async function favicon(file) {
  const png = await sharp(LOGO).resize(32, 32).png().toBuffer();
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // riservato
  header.writeUInt16LE(1, 2); // tipo: icona
  header.writeUInt16LE(1, 4); // numero di immagini
  header.writeUInt8(32, 6); // larghezza
  header.writeUInt8(32, 7); // altezza
  header.writeUInt16LE(1, 10); // piani colore
  header.writeUInt16LE(32, 12); // bit per pixel
  header.writeUInt32LE(png.length, 14); // dimensione dei dati
  header.writeUInt32LE(22, 18); // posizione dei dati
  await writeFile(file, Buffer.concat([header, png]));
}

// Immagine per le anteprime social (1200x630): logo e nome su fondo blu notte.
async function socialImage(file) {
  const logo = await sharp(LOGO).resize(300, 300, { kernel: 'lanczos3' }).toBuffer();
  const text = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${NAVY}"/>
      <rect x="0" y="610" width="1200" height="20" fill="#00e676"/>
      <text x="470" y="300" font-family="Inter, Helvetica, Arial, sans-serif" font-size="96" font-weight="800" fill="#ffffff">ASD ASCA TT</text>
      <text x="474" y="380" font-family="Inter, Helvetica, Arial, sans-serif" font-size="48" font-weight="600" fill="#00e676">Tennistavolo</text>
    </svg>`);
  await sharp(text)
    .composite([{ input: logo, left: 110, top: 165 }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(file);
}

await favicon('public/favicon.ico');
await squareIcon(180, 140, 'public/apple-touch-icon.png');
await squareIcon(192, 150, 'public/icon-192.png');
await socialImage('public/og-default.jpg');
console.log('Icone generate in public/');
