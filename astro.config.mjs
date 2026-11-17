// Configurazione Astro: sito statico, Tailwind 4, sitemap e font Inter locale.
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Anteprima su GitHub Pages: il sito sta in una sottocartella (mr-orip.github.io/ascatt-sito/).
// La build la attiva con GITHUB_PAGES=true (vedi .github/workflows/pages.yml).
const githubPages = process.env.GITHUB_PAGES === 'true';
const pagesBase = '/ascatt-sito';

// Nella build per GitHub Pages aggiunge la sottocartella ai link interni scritti come "/pagina/"
// (menu, pulsanti, link nelle news). I file di Astro (/_astro/...) hanno già la sottocartella.
function prefixInternalLinks(base) {
  return {
    name: 'prefix-internal-links',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        const files = await readdir(root, { recursive: true });
        const pattern = new RegExp(`(\\s(?:href|src)=")/(?!/|${base.slice(1)}/)`, 'g');
        for (const file of files.filter((name) => name.endsWith('.html'))) {
          const path = join(root, file);
          const html = await readFile(path, 'utf8');
          await writeFile(path, html.replace(pattern, `$1${base}/`));
        }
      },
    },
  };
}

export default defineConfig({
  // Indirizzo definitivo del sito: serve per canonical, Open Graph e sitemap.
  // Da confermare (con o senza "www") prima di andare in produzione.
  site: githubPages ? 'https://mr-orip.github.io' : 'https://www.ascatt.it',
  base: githubPages ? pagesBase : '/',
  trailingSlash: 'always',
  integrations: [sitemap(), ...(githubPages ? [prefixInternalLinks(pagesBase)] : [])],
  vite: { plugins: [tailwindcss()] },
  // Inter è un file dentro il progetto (src/assets/fonts): nessuna richiesta a Google Fonts.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
