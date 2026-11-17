// Percorsi interni che tengono conto di "base" (es. "/ascatt-sito/" nell'anteprima su GitHub Pages).
// Sul dominio definitivo "base" è "/" e questi aiuti non cambiano nulla.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// "/corsi/" → "/ascatt-sito/corsi/" quando il sito sta in una sottocartella.
export function withBase(path: string): string {
  return path.startsWith('/') ? `${base}${path}` : path;
}

// "/ascatt-sito/corsi/" → "/corsi/": serve per confrontare la pagina corrente con le voci del menu.
export function withoutBase(pathname: string): string {
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}

// True nelle anteprime pubblicate in una sottocartella: lì le pagine non vanno indicizzate.
export const isSubfolderPreview = base !== '';
