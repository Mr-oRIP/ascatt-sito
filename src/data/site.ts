// Dati generali del sito: nome, contatti, palestra, social.
// Tutto quello che contiene "[... da confermare]" è un segnaposto:
// l'elenco completo è in docs/contenuti-da-confermare.md.

export const site = {
  name: 'ASD ASCA TT',
  shortName: 'ASCA TT',
  tagline: 'Tennistavolo per tutte le età',
  description:
    'ASD ASCA TT è una società di tennistavolo lombarda: corsi per bambini, ragazzi e adulti, e squadre nei campionati regionali FITeT.',
  season: '2026/27',

  // Finché è true, le pagine con dati di esempio (orari, squadre, corsi, sponsor, news)
  // mostrano un avviso. Mettere false quando i dati veri sono stati inseriti.
  showSampleNotice: true,

  // --- Contatti (segnaposto) ---
  // Numero WhatsApp in formato internazionale senza "+" e senza spazi, es. 393331234567.
  whatsappNumber: '390000000000',
  whatsappLabel: '[numero da confermare]',
  email: 'info@example.com',
  emailLabel: '[email da confermare]',

  // --- Palestra (segnaposto) ---
  venue: {
    name: '[Nome palestra da confermare]',
    street: '[Via e numero da confermare]',
    city: '[CAP e Comune da confermare]',
    // Link a Google Maps: sostituire con il link vero della palestra.
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=palestra+tennistavolo',
  },

  // --- Social (segnaposto: lasciare '' per nascondere un social) ---
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },

  // --- Dati della società (segnaposto) ---
  legal: {
    fullName: 'ASD ASCA TT',
    taxCode: '[Codice fiscale / P. IVA da confermare]',
    registeredOffice: '[Sede legale da confermare]',
    fitetCode: '[Codice affiliazione FITeT da confermare]',
  },
};

// Voci del menu principale, nell'ordine in cui compaiono.
export const navigation = [
  { label: 'Società', href: '/societa/' },
  { label: 'Squadre', href: '/squadre/' },
  { label: 'Corsi', href: '/corsi/' },
  { label: 'Orari', href: '/orari-e-palestra/' },
  { label: 'News', href: '/news/' },
  { label: 'Sponsor', href: '/sponsor/' },
  { label: 'Contatti', href: '/contatti/' },
];

// Link WhatsApp con un messaggio già scritto (facoltativo).
export function whatsappLink(message = ''): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Link mailto con oggetto già scritto (facoltativo).
export function mailLink(subject = ''): string {
  const base = `mailto:${site.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
