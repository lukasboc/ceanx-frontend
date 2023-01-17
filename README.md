# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- Webstorm (Plugins für Vue gibt es einige)
- oder [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
##Lokales setup

- .env aus `.env.example` erstellen
- packages mit `npm install` installieren
- lokal starten mit `npm run dev`

### Customize BASE_URL
Die Base URL für das Backend und das Frontend können in der .env gesetzt werden.
```
VITE_BASE_URL = https://cenx.lubomedia.de
VITE_PROJECT_URL = https://api.ceanx.lubomedia.de/api

Falls Lokal:
VITE_BASE_URL = http://localhost:3000
VITE_PROJECT_URL = http://localhost:8000/api
```
Nach der anpassung muss, `npm run dev` nochmal ausgeführt werden.

Bei Änderung des API Pfads muss ebenfalls in der src/apis/Api.js angepasst werden:

```
baseURL: 'http://localhost:8000',
//baseURL: 'https://api.ceanx.lubomedia.de',

```
Bitt kein "/" an das Ende der URL setzen, ansonsten kommen Fehler.

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
