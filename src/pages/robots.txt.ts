// robots.txt generato dalla build, così l'indirizzo della sitemap segue "site" in astro.config.mjs.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`);
};
