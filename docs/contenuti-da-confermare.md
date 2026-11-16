# Contenuti da confermare

Tutti i testi del sito sono provvisori e scritti senza conoscere i dati veri della società. Il vecchio sito ascatt.it non ha risposto (timeout di 30 secondi il 2026-11-17), quindi nessun dato arriva da lì.

Nel sito i dati mancanti sono scritti tra parentesi quadre, es. `[Quota da confermare]`. Per trovarli: `grep -rn "da confermare" src/`.

## Dati della società e contatti (`src/data/site.ts`)

| Dato | Valore attuale | Note |
| --- | --- | --- |
| Numero WhatsApp | `390000000000` (finto) | I pulsanti WhatsApp non funzionano finché non c'è il numero vero |
| Email | `info@example.com` (finta) | I pulsanti email aprono un messaggio verso un indirizzo finto |
| Nome della palestra | segnaposto | |
| Via, CAP e Comune | segnaposto | Il Comune compare anche nel testo della storia |
| Link Google Maps | ricerca generica | Sostituire con il link della palestra |
| Instagram e Facebook | home dei due social | Mettere i profili veri, oppure `''` per nascondere |
| Codice fiscale / P. IVA | segnaposto | Footer e pagina privacy |
| Sede legale | segnaposto | |
| Codice affiliazione FITeT | segnaposto | |
| Stagione | `2026/27` | Ricavata dalla data di oggi |
| Descrizione per Google | "società di tennistavolo lombarda..." | Aggiungere il Comune quando è confermato |

## Indirizzo del sito (`astro.config.mjs`)

- `site: 'https://www.ascatt.it'`: da confermare se il sito definitivo userà `www` oppure no. Serve per sitemap, canonical e anteprime social.

## La società (`src/pages/societa.astro`, `src/content/staff.yaml`)

- Anno di fondazione e Comune: segnaposto.
- Storia: due paragrafi generici, da riscrivere con le tappe vere. Nessun titolo o risultato è stato inventato.
- "Cosa ci sta a cuore": tre blocchi generici (per tutti, settore giovanile, agonismo e amicizia) da rivedere.
- Consiglio direttivo (presidente, vicepresidente, segreteria) e allenatori (tre ruoli): nomi, qualifiche e ruoli sono segnaposto. Verificare anche che i ruoli elencati esistano davvero.
- "Società affiliata FITeT" (footer e pagina società): dato per vero in base alla richiesta, da confermare.

## Squadre (`src/content/teams/*.yaml`)

- Tre squadre di esempio (A in D1, B in D2, C in D3): numero di squadre, nomi e serie sono da confermare.
- Gironi, classifiche, risultati, calendario e giocatori sono **inventati**. Le avversarie si chiamano "Avversaria 1, 2..." apposta, per non attribuire risultati finti a società vere.
- `fitetUrl` punta alla home del portale risultati FITeT (`https://portale.fitet.org/`): va sostituito con il link del girone di ogni squadra.
- Giorno e ora delle partite in casa: segnaposto.
- "L'ingresso è libero" (pagina Squadre): da confermare.
- Giocatori: pubblicare i nomi solo di adulti e con il loro consenso.

## Corsi (`src/content/courses/*.yaml`, `src/pages/corsi.astro`)

- Quattro corsi: bambini, ragazzi, adulti e amatori, agonisti. Da confermare che i gruppi siano questi.
- Fasce d'età: segnaposto.
- Giorni e orari: **di esempio**.
- Quote: segnaposto (nessun prezzo inventato).
- Prova gratuita: il numero di lezioni è segnaposto. Da confermare anche che sia gratuita per tutti i corsi.
- "Iscriversi è semplice": documenti richiesti (modulo, certificato medico), modalità di pagamento ed eventuale riduzione per chi inizia ad anno avviato sono da confermare.
- Domande frequenti: "racchetta e palline le prestiamo noi" e "ci si può inserire in qualsiasi momento" sono ipotesi da confermare.

## Orari e palestra (`src/content/schedule.yaml`, `src/pages/orari-e-palestra.astro`)

- Orari settimanali: **di esempio**.
- Indicazioni in auto, con i mezzi, parcheggio e ingresso: segnaposto.
- "Durante le festività e in estate gli orari possono cambiare": frase generica.

## News (`src/content/news/*.md`)

- Tre articoli di esempio (campionati, open day, iscrizioni): tutti da sostituire. Ognuno si dichiara "articolo di esempio" nel riassunto e nella prima riga.
- La data dell'open day è segnaposto.

## Sponsor (`src/content/sponsors.yaml`, `src/pages/sponsor.astro`)

- Un main sponsor e quattro sponsor: nomi segnaposto, nessun logo.
- "Diventa sponsor": spazi disponibili, formule e importi sono segnaposto.

## Privacy e note legali (`src/pages/privacy.astro`)

- Testo minimo e provvisorio, **non è una consulenza legale**: va fatto rivedere dalla società.
- Da completare: titolare, fornitore di hosting e tempi di conservazione dei log, riferimenti normativi e modalità di reclamo.

## Testi di tono (da riscrivere liberamente)

- Titolo dell'hero: "Prendi la racchetta. Al resto pensiamo noi."
- Slogan: "Tennistavolo per tutte le età".
- Pagina 404: "Palla fuori!".
