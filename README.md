# 🎅 Secret Santa Organizer

Benvenuto nel **Secret Santa Organizer**, un’applicazione web (Single Page Application) che permette di:

- ✏️ Registrare partecipanti  
- 🎁 Gestire due modalità di gioco (A e B)  
- 🔒 Chiudere le iscrizioni  
- 🔀 Estrarre partecipanti in modo casuale senza ripetizioni  
- 🔄 (Opzionale) Generare abbinamenti “in anticipo”  
- 🖼️ Mostrare una *hero section* natalizia personalizzata  

---

## 🚀 Tecnologie utilizzate

| Tecnologia | Scopo |
|-----------|--------|
| **React 18** | UI e componenti |
| **TypeScript** | Tipizzazione e robustezza della codebase |
| **Vite** | Dev server veloce e build ottimizzata |
| **TailwindCSS** | Styling moderno con palette personalizzata |
| **LocalStorage** | Persistenza lato client |

---

## 📦 Installazione

### Requisiti
- Node.js >= 18
- npm


### 1. Clona il repository
```bash
git clone https://github.com/ArianoDev/secret-santa.git
cd secret-santa
```
### 2. Installa le dipendenze
```bash
npm install
```
### 3. Avvia l’ambiente di sviluppo
```bash
npm run dev
```

### 🏗️ Build di produzione

Per generare la build ottimizzata:
```bash
npm run build
```

Per testare la build:
```bash
npm run preview
```

## Deploy con Docker

L'immagine usa Node.js per compilare il frontend e Nginx per servire i file
statici sulla porta `80`. Il backend deve essere distribuito separatamente.

Dalla directory del progetto, crea l'immagine:

```bash
docker build -t secret-santa \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  --build-arg VITE_ADMIN_CODE=codice-admin \
  .
```

Sostituisci l'URL con quello del backend, raggiungibile dal browser degli utenti
e senza slash finale. Il backend deve consentire le richieste CORS dall'origine
del frontend. Se il frontend usa HTTPS, anche il backend deve usare HTTPS.

Avvia il container:

```bash
docker run -d --name secret-santa --restart unless-stopped -p 8080:80 secret-santa
```

Il frontend e' disponibile su `http://localhost:8080`. Per esporlo in produzione
tramite HTTPS, configura un reverse proxy o il servizio di ingress del tuo hosting.

Le variabili `VITE_API_BASE_URL` e `VITE_ADMIN_CODE` sono incorporate nel bundle
durante la build: per cambiarle occorre ricreare l'immagine. Passarle con
`docker run -e` non modifica il frontend. I file `.env` locali sono esclusi
dal contesto Docker. Senza `VITE_API_BASE_URL`, l'app usa `http://localhost:4000`,
cioe' la macchina dell'utente che apre il browser, non il container.

**Sicurezza:** `VITE_ADMIN_CODE` e' leggibile nel JavaScript scaricato dal browser.
Non e' un segreto e non sostituisce l'autenticazione e l'autorizzazione sul backend.
