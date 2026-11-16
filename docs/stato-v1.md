# Stato della versione 1

Scritto il 2026-11-17. Il sito è completo come struttura e grafica, ma **tutti i contenuti sono provvisori**: non è pronto per la pubblicazione finché non vengono inseriti i dati veri.

## Cosa c'è

Sito statico con Astro 7, TypeScript e Tailwind CSS 4. 16 pagine generate:

| Pagina | Indirizzo | Contenuto |
| --- | --- | --- |
| Home | `/` | Hero con "Prenota la prova gratuita" e WhatsApp, numeri in breve, ultime 3 news, squadre, corsi, sponsor, dove siamo con orari |
| La società | `/societa/` | Storia, valori, allenatori, consiglio direttivo, dati della società |
| Squadre | `/squadre/` | Una card per squadra (serie, girone, stagione, posizione, punti) e filtro per serie |
| Squadra | `/squadre/asca-tt-a/` ecc. | Classifica, risultati, prossimi incontri, rosa, link al portale FITeT |
| Corsi | `/corsi/` | 4 schede (bambini, ragazzi, adulti e amatori, agonisti), iscrizione in 3 passi, prova gratuita, domande frequenti |
| Orari e palestra | `/orari-e-palestra/` | Orari in testo, indirizzo, link alla mappa, come arrivare |
| News | `/news/` e `/news/<articolo>/` | Elenco e 3 articoli di esempio in Markdown |
| Sponsor | `/sponsor/` | Main sponsor in evidenza, griglia, "diventa sponsor" |
| Contatti | `/contatti/` | WhatsApp, email, palestra, social (nessun modulo) |
| Privacy | `/privacy/` | Privacy e note legali minime |
| 404 | pagina non trovata | |

In tutte le pagine: header fisso con menu, pulsante "Prova gratuita", pulsante WhatsApp fisso in basso a destra, footer con contatti.

Altro: sitemap (`/sitemap-index.xml`), `robots.txt`, favicon e icone dal logo, immagine social di default, metadati SEO e Open Graph, dati strutturati della società. Nessun cookie, nessun analytics, nessuna richiesta a servizi esterni (font Inter dentro il progetto).

## Come è stato verificato

Tutto in locale, sul sito costruito con `npm run build` e servito con `npm run preview`.

- **Build:** `npm run build` finisce senza errori (16 pagine). `npm run check`: 0 errori, 0 avvisi.
- **Screenshot:** 12 pagine (le 11 del sito più la 404) a 375, 768 e 1440 px, con Playwright. Li ho guardati tutti: a 375 px e per la home a grandezza piena; per le altre pagine a 768 e 1440 px rimpiccioliti (abbastanza per vedere l'impaginazione, non per leggere ogni riga).
- **Controlli automatici su tutte le 36 combinazioni:** nessuno sforamento orizzontale, nessuna immagine rotta, un solo `h1` per pagina, nessuna immagine senza `alt`, nessun errore in console (a parte il 404 atteso della pagina di test).
- **Correzioni fatte dopo gli screenshot:** giorni della settimana in ordine sbagliato (erano alfabetici), foto verticali tagliate male nelle card (ritagliate in orizzontale), contenitore troppo stretto a 1440 px, velo dell'hero troppo leggero su telefono per il contrasto del testo, pulsante FITeT che andava a capo e footer troppo stretto a 768 px, pulsanti attaccati al testo nelle card dei contatti. Le ultime tre correzioni le ho ricontrollate solo con uno screenshot mirato a 768 e 375 px, non rifacendo tutto il giro.
- **Tastiera:** link "Vai al contenuto", ordine del focus nell'header, contorno giallo sempre visibile, menu su telefono apribile con Invio e chiudibile con Esc (il focus torna al pulsante), filtro per serie usabile da tastiera con annuncio per screen reader.
- **Contrasto:** tutte le coppie testo/sfondo della palette sono sopra 4,5:1 (la più bassa è l'azzurro dei link sulle card, 6,9:1). L'audit di contrasto di Lighthouse passa su tutte le pagine. Il testo dell'hero è sopra una foto: l'ho verificato con il calcolo sul caso peggiore (velo al 70% su bianco), non con uno strumento.

### Lighthouse

Lighthouse 13.6.0, sul sito in locale (`http://127.0.0.1:4321`). Sono numeri veri ma di laboratorio: su Vercel con rete reale possono essere un po' diversi, soprattutto la Performance.

Ultimo giro, dopo tutte le correzioni:

| Pagina | Dispositivo | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | mobile | 100 | 100 | 100 | 100 | 1,7 s | 0 |
| Home | desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| Corsi | mobile | 100 | 100 | 100 | 100 | 1,6 s | 0 |
| Corsi | desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| Squadra A | mobile | 100 | 100 | 100 | 100 | 0,8 s | 0 |
| Squadra A | desktop | 100 | 100 | 100 | 100 | 0,2 s | 0 |

Anche Contatti (mobile) è a 100 nelle quattro categorie nell'ultimo giro. Un giro precedente su tutte le 11 pagine (mobile) aveva dato 100 ovunque; dopo quel giro sono cambiati solo il velo dell'hero, la spaziatura delle card dei contatti, la testata della pagina squadra e la griglia del footer, e le altre pagine non sono state rimisurate.

Al primo giro la pagina Corsi aveva Accessibility 90 (lista di definizioni non valida e salto da `h1` a `h3`): corretto, e lo stesso salto di titoli è stato corretto anche in News e Squadre.

## Cosa non è stato fatto

- **Deploy di anteprima su Vercel: non fatto.** La CLI di Vercel su questo computer non ha fatto il login e il collegamento Vercel di Claude non è autorizzato sullo spazio `piro-pong` (serve una tua approvazione). Inoltre il collegamento accetta i file solo passandoli uno a uno, cosa non praticabile con le foto. Vedi "Prossimi passi".
- **Figma: non usato.** Era facoltativo. Niente logo vettoriale e niente file Figma con le pagine.
- **Vecchio sito ascatt.it: non ha risposto** (timeout di 30 secondi). Nessun dato arriva da lì.
- **Nessun test su telefoni veri** né con uno screen reader vero: solo emulazione in Chrome.
- **Nessun push.** Tutto è in commit locali sul ramo `main`.

## Cosa è provvisorio

- **Tutti i testi**, scritti senza conoscere la società. Elenco completo: [`contenuti-da-confermare.md`](contenuti-da-confermare.md).
- **Contatti finti:** WhatsApp `390000000000` ed email `info@example.com`. I pulsanti di contatto, che sono la call to action principale, non funzionano finché non ci sono i dati veri.
- **Squadre, gironi, classifiche, risultati e giocatori: inventati.** Le avversarie si chiamano "Avversaria 1, 2..." apposta.
- **Orari di corsi e palestra: di esempio.** Quote, età, indirizzo, nomi di staff e sponsor sono segnaposto tra parentesi quadre.
- **Tutte le 10 foto**, prese da Unsplash: [`foto-da-raccogliere.md`](foto-da-raccogliere.md).
- **Privacy e note legali:** traccia minima, non è una consulenza legale.
- **Avviso "Dati di esempio"** (riquadro giallo) e riga "Sito in anteprima" nel footer: si spengono con `showSampleNotice: false` in `src/data/site.ts`.

## Decisioni prese e perché

- **Stack come richiesto (Astro + TypeScript + Tailwind):** è la scelta giusta per questo caso, non ho trovato motivi per cambiarla. Ho usato le versioni correnti (Astro 7.4, Tailwind 4.3), controllando la documentazione di Astro 7 prima di scrivere.
- **Tema scuro su tutto il sito** (blu notte + verde fluo dei social), con il giallo del logo solo per il contorno del focus, l'avviso dei dati di esempio e il bordo del main sponsor. Così il sito è coerente con le storie Instagram.
- **Nomi nel codice in inglese, testi in italiano**, come da CLAUDE.md. Quindi le cartelle dei contenuti si chiamano `teams`, `courses`, `news` e i campi `series`, `group`, `standings`; gli indirizzi delle pagine restano in italiano (`/squadre/`, `/corsi/`). Se preferisci i campi in italiano nei file che modifichi a mano, si cambia in poco tempo.
- **Squadre e corsi in YAML, non JSON:** si possono mettere commenti dentro il file e le liste di incontri si scrivono una per riga.
- **La posizione in classifica non si scrive a mano:** viene ricavata dalla riga della squadra in `standings`. Un dato in meno da aggiornare e nessun rischio che card e classifica dicano cose diverse.
- **Campo `order` in orari, sponsor e staff:** Astro non garantisce l'ordine delle voci di un file, e infatti i giorni uscivano in ordine alfabetico.
- **Segnaposto in due forme:** parentesi quadre per i dati che non conosco (prezzi, indirizzo, nomi), valori di esempio per quelli che servono a giudicare l'impaginazione (orari, classifiche), sempre con l'avviso giallo in pagina. Con soli segnaposto tra parentesi le tabelle sarebbero state illeggibili.
- **"Prova gratuita" porta a `/corsi/#prova-gratuita`**, non direttamente a WhatsApp: lì si spiega cosa scrivere e ci sono sia WhatsApp sia email.
- **Foto senza volti riconoscibili.** Ho scartato le foto di partite vere trovate su Unsplash perché mostravano persone riconoscibili, striscioni di sponsor o marchi in evidenza. Il risultato sono molte racchette e poche persone: è il limite principale della grafica attuale e si risolve solo con foto vere.
- **Loghi sponsor su fondo bianco:** quasi tutti i loghi aziendali sono pensati per il bianco.
- **Indirizzo del sito impostato a `https://www.ascatt.it`** in `astro.config.mjs`: serve solo a generare sitemap e link canonici, non tocca il dominio.
- **Intestazioni di sicurezza semplici** in `vercel.json`, senza Content Security Policy: da valutare prima della produzione.
- **Niente RSS, niente ricerca, niente galleria:** non richiesti.

## Cose da sapere

- **`CLAUDE.md` è nel `.gitignore`**, quindi non finisce nel repository anche se contiene le regole del progetto. Se è voluto va bene così; se no, va tolto dal `.gitignore`.
- In Astro 7 `npm run preview` parte in background: si ferma con `npx astro preview stop`.
- L'immagine social di default usa il logo a 150 px ingrandito, quindi è un po' sgranata.

## Domande per te

1. **Dove ha sede la società e dove si gioca?** Comune, palestra, indirizzo. Senza questo il sito non può dire "tennistavolo a ...", che è la cosa più utile per chi cerca su Google.
2. **Quante squadre e in quali serie** nella stagione 2026/27? E i link ai gironi sul portale FITeT.
3. **I corsi sono davvero quattro gruppi così?** Con quali giorni, orari e quote? La prova gratuita vale per tutti e per quante lezioni?
4. **Numero WhatsApp ed email** da pubblicare, e profili Instagram e Facebook.
5. **I nomi dei giocatori adulti** vanno pubblicati nelle pagine delle squadre, o meglio lasciare solo la classifica?
6. **Campi dei file in inglese o in italiano?** (vedi decisioni)
7. **`www.ascatt.it` o `ascatt.it`** come indirizzo definitivo?
8. **Esiste un logo ad alta risoluzione o vettoriale?** Se no, lo ridisegno in SVG da far approvare.
9. **Chi ospita oggi ascatt.it e chi gestisce il dominio?** Servirà al momento del passaggio.

## Prossimi passi consigliati

1. **Anteprima su Vercel.** Da questa cartella: `npx vercel login`, poi `npx vercel deploy --environment preview`. Non ho potuto provare il comando: controlla che il risultato dica "Preview" e non "Production", perché non ho verificato come Vercel tratta il primo deploy di un progetto nuovo. In alternativa, se colleghi il repository GitHub a Vercel, ricorda che ogni push su `main` crea un deploy di produzione: per le anteprime usa un altro ramo.
2. **Inserire i dati veri** partendo da `src/data/site.ts` (contatti e indirizzo), poi squadre, corsi e orari.
3. **Fare le foto vere**, almeno hero, palestra e una per corso: è il cambiamento che migliora di più il sito.
4. **Far rivedere privacy e note legali** dalla società.
5. **Rifare Lighthouse sull'anteprima Vercel** e provare il sito su un paio di telefoni veri.
6. Solo dopo l'approvazione della società: spegnere `showSampleNotice`, decidere l'indirizzo definitivo e pianificare il passaggio del dominio.
