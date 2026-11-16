// Piccole funzioni per mostrare le date in italiano.

const longDate = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Rome',
});

const shortDate = new Intl.DateTimeFormat('it-IT', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'Europe/Rome',
});

// Esempio: "8 novembre 2026"
export function formatDate(date: Date): string {
  return longDate.format(date);
}

// Esempio: "sab 28 nov"
export function formatShortDate(date: Date): string {
  return shortDate.format(date);
}

// Data per l'attributo datetime di <time>, es. "2026-11-08"
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
