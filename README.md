# CeanX Frontend

Dies ist das Repository des CeanX Frontends, welches auf [Vue 3](https://vuejs.org/guide/introduction.html) und  [Vite](https://v2.vitejs.dev/config/) basiert.

## Mögliche Entwicklungsumgebungen

- Webstorm (Für Vue gibt es einige Plugins, die die Entwicklung erleichtern)
- oder [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Lokales Setup

- .env aus `.env.example` erstellen
- Packages mit `npm install` installieren
- Lokal starten mit `npm run dev`

## Produktives Setup

- .env aus `.env.example` erstellen
- Packages mit `npm install` installieren
- Kompilieren und minifizieren durch  `npm run build`

Anschließend können in `/dist` Dateien gefunden werden, die auf einem Webserver geladen werden können.

Ggf. ist für das Prod-Deployment eine .htaccess mit folgenden Inhalten nötig:
```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
```

## Hinweise zur .env Erzeugung

Die `.env.example` enthält Beispiele für den lokalen und produktiven Betrieb des Frontends in Verbindung mit dem [CeanX Backend](https://github.com/lukasboc/ceanx-backend).
Die Variable `VITE_BASE_URL` muss die URL zum Frontend enthalten, die `VITE_BACKEND_BASE` die URL zum Backend und die `VITE_PROJECT_URL` die URL des Backends mit dem Zusatz /api.

```
#VITE_BASE_URL = https://ceanx.lubomedia.de
#VITE_PROJECT_URL = https://api.ceanx.lubomedia.de/api
#VITE_BACKEND_BASE=https://api.ceanx.lubomedia.de

VITE_BASE_URL=http://localhost:3000
VITE_PROJECT_URL=http://localhost:8000/api
VITE_BACKEND_BASE=http://localhost:8000
```

Bitt kein "/" an das Ende der URLs setzen, ansonsten kommt es zu Fehlern.

Sofern zur Laufzeit Anpassungen an der `.env` vorgenommen werden, empfiehlt es sich `npm run dev` nochmal auszuführen.