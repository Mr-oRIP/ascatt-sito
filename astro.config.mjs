// Configurazione Astro: sito statico, Tailwind 4, sitemap e font Inter locale.
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Indirizzo definitivo del sito: serve per canonical, Open Graph e sitemap.
  // Da confermare (con o senza "www") prima di andare in produzione.
  site: 'https://www.ascatt.it',
  trailingSlash: 'always',
  integrations: [sitemap()],
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
