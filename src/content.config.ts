// Collezioni di contenuti: ogni news, squadra, corso, ecc. è un file in src/content/.
// Lo schema controlla i campi durante la build: se manca qualcosa, la build si ferma
// e dice quale file correggere.
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// News: un file Markdown per articolo in src/content/news/
const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // riassunto breve: elenco news, Google e anteprime social
      date: z.coerce.date(),
      cover: image().optional(), // percorso relativo, es. ../../assets/foto/nome.jpg
      coverAlt: z.string().default(''),
      draft: z.boolean().default(false), // true = non pubblicata
    }),
});

// Squadre: un file YAML per squadra in src/content/teams/
const teams = defineCollection({
  loader: glob({ base: './src/content/teams', pattern: '*.yaml' }),
  schema: z.object({
    name: z.string(),
    series: z.string(), // es. "D1": è il valore usato dal filtro per serie
    group: z.string(), // es. "Girone B"
    season: z.string(), // es. "2026/27"
    order: z.number().default(99), // ordine nelle liste (1 = prima)
    fitetUrl: z.url(), // pagina ufficiale FITeT del girone
    updatedAt: z.coerce.date(), // data dell'ultimo aggiornamento a mano
    homeMatches: z.string().optional(), // giorno e ora delle partite in casa
    players: z.array(z.string()).default([]),
    // Classifica del girone, dalla prima all'ultima. La posizione della squadra
    // si ricava dalla riga con lo stesso nome della squadra (campo "name").
    standings: z
      .array(
        z.object({
          team: z.string(),
          played: z.number(),
          won: z.number(),
          lost: z.number(),
          points: z.number(),
        }),
      )
      .default([]),
    // Incontri: con "result" sono giocati, senza sono in calendario.
    matches: z
      .array(
        z.object({
          date: z.coerce.date(),
          home: z.string(),
          away: z.string(),
          result: z.string().optional(), // es. "5-3" (casa-ospiti)
        }),
      )
      .default([]),
  }),
});

// Corsi: un file YAML per corso in src/content/courses/
const courses = defineCollection({
  loader: glob({ base: './src/content/courses', pattern: '*.yaml' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      audience: z.string(), // a chi è rivolto, es. "6-10 anni"
      description: z.string(),
      order: z.number().default(99),
      sessions: z.array(z.object({ day: z.string(), time: z.string() })),
      fee: z.string(), // quota, es. "€ 250 all'anno"
      trial: z.string(), // prova gratuita, es. "2 lezioni di prova gratuite"
      image: image(),
      imageAlt: z.string(),
    }),
});

// Orari della palestra: un solo file, src/content/schedule.yaml
const schedule = defineCollection({
  loader: file('src/content/schedule.yaml'),
  schema: z.object({
    day: z.string(),
    slots: z.array(z.object({ time: z.string(), activity: z.string() })),
  }),
});

// Sponsor: un solo file, src/content/sponsors.yaml
const sponsors = defineCollection({
  loader: file('src/content/sponsors.yaml'),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['main', 'partner']), // main = in evidenza
    description: z.string().optional(),
    url: z.url().optional(),
    logo: z.string().optional(), // file in public/sponsor/, es. "/sponsor/nome.svg"
  }),
});

// Staff e consiglio: un solo file, src/content/staff.yaml
const staff = defineCollection({
  loader: file('src/content/staff.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['board', 'coaches']), // board = consiglio, coaches = allenatori
    bio: z.string().optional(),
  }),
});

export const collections = { news, teams, courses, schedule, sponsors, staff };
