# 🎭 Puppeteer Test Website

Een simpele test website om Puppeteer functionaliteit te testen in de Trustmark OSINT scanner.

## Features

### Statische Content (Cheerio ziet dit)
- ✅ Direct in HTML aanwezig
- ✅ Badges voor certificaten (ISO 27001, GDPR, SSL/TLS)
- ✅ Privacy/Cookie/Security/Terms pagina's

### Dynamische Content (Alleen Puppeteer ziet dit)
- 🎨 JavaScript-rendered badges (PCI DSS, SOC 2, HIPAA)
- 🌐 Simulated API calls met compliance data
- ⏰ Vertraagde content (test timeout handling)
- 📊 Console logging (test captureConsole)

## Gebruik

### Starten
```bash
cd c:\Users\thimo\Documents\vsc_stage\trustmark\test-website
node server.js
```

Server draait op: **http://localhost:3333**

### Testen met Trustmark

1. Start de test website: `node server.js`
2. Start Trustmark landing page: `npm run dev` (in landing-page folder)
3. Open browser: http://localhost:5000
4. Voer in de scanner in: `localhost:3333`
5. Bekijk de scan resultaten

### Wat te verwachten

**Met ENABLE_PUPPETEER=false (alleen Cheerio):**
- ✅ Statische badges: ISO 27001, GDPR, SSL/TLS
- ❌ Geen PCI DSS, SOC 2, HIPAA badges
- ❌ Geen API-geladen compliance data
- ❌ Geen vertraagde content

**Met ENABLE_PUPPETEER=true (Puppeteer + Cheerio):**
- ✅ Statische badges: ISO 27001, GDPR, SSL/TLS
- ✅ Dynamische badges: PCI DSS, SOC 2, HIPAA
- ✅ API-geladen compliance data (95% score)
- ✅ Vertraagde content: ISO 9001, CSA STAR
- ✅ Console logs zichtbaar

## Pagina's

- `/` - Homepage met alle test content
- `/privacy` - Privacy Policy (GDPR test)
- `/cookies` - Cookie Policy (GDPR test)
- `/security` - Security Policy (beveiligingsmaatregelen)
- `/terms` - Terms of Service (algemene voorwaarden)

## Tech Stack

- Pure HTML/CSS/JavaScript (geen frameworks)
- Node.js HTTP server (geen dependencies)
- Port: 3333 (conflict-vrij met landing page op 5000)

## Troubleshooting

**"EADDRINUSE: address already in use"**
- Port 3333 is al in gebruik
- Wijzig PORT in server.js naar een andere waarde

**Scanner kan localhost niet bereiken**
- Zorg dat beide servers draaien (test-website + landing-page)
- Check firewall instellingen
- Probeer `127.0.0.1:3333` in plaats van `localhost:3333`
