# Sito ASD ASCA TT

Nuovo sito della società di tennistavolo ASD ASCA TT. Sito statico fatto con [Astro](https://astro.build), TypeScript e Tailwind CSS: i contenuti sono file di testo in `src/content/`, quindi aggiornare il sito vuol dire modificare un file.

Stato della prima versione, cose provvisorie e domande aperte: [`docs/stato-v1.md`](docs/stato-v1.md).

## Avviare il sito

Serve Node.js 22.23 o più recente.

```bash
npm install        # solo la prima volta
npm run dev        # sito in locale su http://localhost:4321, si aggiorna a ogni salvataggio
npm run build      # crea il sito finale in dist/ (deve finire senza errori)
npm run preview    # serve dist/ in locale (si ferma con: npx astro preview stop)
npm run check      # controllo dei tipi TypeScript e dei file .astro
```

Se un file di contenuto ha un campo mancante o sbagliato, `npm run dev` e `npm run build` si fermano e indicano il file da correggere.

## Dove sono le cose

```text
src/
  content/            contenuti da aggiornare
    news/             un file Markdown per articolo
    teams/            un file YAML per squadra
    courses/          un file YAML per corso
    schedule.yaml     orari settimanali della palestra
    sponsors.yaml     sponsor
    staff.yaml        consiglio direttivo e allenatori
  content.config.ts   elenco dei campi ammessi in ogni tipo di contenuto
  data/site.ts        nome, contatti, indirizzo, social, voci del menu
  pages/              una pagina del sito per file
  components/         pezzi riusati (header, footer, card...)
  layouts/Base.astro  struttura comune e metadati SEO
  styles/global.css   colori, pulsanti, stile dei testi
  assets/foto/        foto (ottimizzate automaticamente dalla build)
brand/                logo originale
public/               file copiati così come sono (favicon, immagine social, loghi sponsor)
docs/                 note di progetto
```

## Aggiungere una news

1. Crea un file in `src/content/news/`, per esempio `2026-12-01-torneo-di-natale.md`. Il nome del file diventa l'indirizzo: `/news/2026-12-01-torneo-di-natale/`.
2. Scrivi in cima i dati dell'articolo e sotto il testo in Markdown:

   ```markdown
   ---
   title: "Torneo di Natale: iscrizioni aperte"
   description: "Riassunto di una o due righe: compare nell'elenco, su Google e nelle anteprime social."
   date: 2026-12-01
   cover: ../../assets/foto/torneo-natale.jpg
   coverAlt: Descrizione della foto per chi non la vede
   ---

   Testo dell'articolo. Si possono usare **grassetto**, elenchi, [link](/corsi/) e titoli con `##`.
   ```

3. La foto di copertina va in `src/assets/foto/` (JPEG, lato lungo circa 1600-2000 px). `cover` e `coverAlt` sono facoltativi.
4. Per preparare un articolo senza pubblicarlo aggiungi `draft: true`.

Le tre news più recenti compaiono da sole in home. Niente nomi o foto di minorenni.

## Aggiornare una squadra

Ogni squadra è un file in `src/content/teams/` (es. `asca-tt-a.yaml`). Dopo ogni giornata:

1. Aggiorna `updatedAt` con la data di oggi.
2. Aggiorna `standings`: le righe della classifica dalla prima all'ultima. La posizione mostrata sul sito è quella della riga che ha lo stesso nome del campo `name`.
3. In `matches` aggiungi `result` all'incontro giocato (formato `"5-3"`, casa-ospiti). Gli incontri senza `result` compaiono tra i "Prossimi incontri".

```yaml
standings:
  - { team: "Avversaria 1", played: 6, won: 6, lost: 0, points: 12 }
  - { team: "ASCA TT A", played: 6, won: 4, lost: 2, points: 8 }
matches:
  - { date: 2026-11-28, home: "Avversaria 3", away: "ASCA TT A", result: "2-5" }
  - { date: 2026-12-12, home: "ASCA TT A", away: "Avversaria 6" }
```

- `fitetUrl` è il link alla pagina ufficiale del girone sul portale FITeT. I dati non vengono scaricati dal portale: si copiano a mano.
- Per aggiungere una squadra copia un file esistente con un nuovo nome; per toglierla cancella il file. `series` (es. `D1`) crea da solo il pulsante del filtro, `order` decide l'ordine delle card.
- A inizio stagione cambia anche `season` qui e in `src/data/site.ts`.

## Cambiare gli orari

- **Orari settimanali della palestra:** `src/content/schedule.yaml`, una voce per giorno con le sue fasce orarie. Compaiono in "Orari e palestra" e in home.
- **Giorni e orari di un corso:** campo `sessions` del file del corso in `src/content/courses/` (lì ci sono anche quota, età e prova gratuita).
- **Indirizzo, link alla mappa, WhatsApp, email, social:** `src/data/site.ts`.
- **Indicazioni per arrivare:** elenco `directions` in cima a `src/pages/orari-e-palestra.astro`.

## Cambiare gli sponsor

Tutto in `src/content/sponsors.yaml`:

```yaml
- id: nome-azienda          # identificativo unico, senza spazi
  name: "Nome Azienda"
  tier: main                # main = in evidenza, partner = griglia
  description: "Una riga sullo sponsor (solo per i main)."
  url: https://www.esempio.it
  logo: /sponsor/nome-azienda.svg
```

Il file del logo va in `public/sponsor/` (SVG oppure PNG largo almeno 600 px). I loghi sono mostrati su fondo bianco. Senza `logo` compare un riquadro con il nome.

## Segnaposto e dati di esempio

- I dati non ancora confermati sono scritti tra parentesi quadre, es. `[Quota da confermare]`. Per trovarli tutti: `grep -rn "da confermare" src/`. L'elenco ragionato è in [`docs/contenuti-da-confermare.md`](docs/contenuti-da-confermare.md).
- Finché `showSampleNotice` è `true` in `src/data/site.ts`, le pagine con dati di esempio mostrano un avviso giallo. Quando i dati sono veri, mettilo a `false`.
- Le foto sono provvisorie: fonti, licenze e foto vere da fare sono in [`docs/foto-da-raccogliere.md`](docs/foto-da-raccogliere.md).

## Logo, icone e colori

- Il logo è `brand/logo-asca.png`. Se cambia, rigenera favicon e immagine social con `npm run icone`.
- I colori sono in cima a `src/styles/global.css`.

## Pubblicazione

Il sito è pensato per Vercel (piano gratuito): Vercel riconosce Astro, esegue `npm run build` e pubblica `dist/`. `vercel.json` aggiunge solo cache e intestazioni di sicurezza.

- Per ora **solo anteprime (preview)**: niente produzione e niente dominio `ascatt.it` finché la società non approva.
- L'indirizzo definitivo del sito è `site` in `astro.config.mjs` (serve a sitemap, canonical e anteprime social).
- Il sito non usa cookie, analytics né variabili d'ambiente: non ci sono segreti da configurare.
