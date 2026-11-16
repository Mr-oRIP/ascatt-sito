// Funzioni di aiuto per le squadre: posizione in classifica e incontri.
import type { CollectionEntry } from 'astro:content';

type Team = CollectionEntry<'teams'>['data'];

// Posizione in classifica: la riga di "standings" con lo stesso nome della squadra.
// Ritorna undefined se la classifica non è stata inserita.
export function getPosition(team: Team): number | undefined {
  const index = team.standings.findIndex((row) => row.team === team.name);
  return index === -1 ? undefined : index + 1;
}

// Incontri già giocati, dal più recente.
export function getPlayedMatches(team: Team) {
  return team.matches
    .filter((match) => match.result)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Incontri ancora da giocare, dal più vicino.
export function getUpcomingMatches(team: Team) {
  return team.matches
    .filter((match) => !match.result)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
