# Daphné & Jean-Baptiste — Wedding Website

Wedding website for October 2-4, 2026 in Pont-Aven, Brittany.

**Live:** https://daphne-et-jeanbaptiste.fly.dev/

## Stack

- [Astro](https://astro.build/) (static site generator)
- [Caddy](https://caddyserver.com/) (file server in Docker)
- [Fly.io](https://fly.io/) (hosting)

## Setup

```bash
nvm use           # Node 24
npm install
npm run dev       # http://localhost:4321
```

## Deploy

```bash
flyctl deploy
```

Rollback: `flyctl releases` then `flyctl releases rollback`.

## Structure

```
src/
├── layouts/BaseLayout.astro     # Shared html/head, Navbar, Footer
├── components/
│   ├── Navbar.astro             # Sticky nav + mobile hamburger
│   ├── Footer.astro             # Contact info footer
│   └── PageHeader.astro         # Page title + subtitle
├── styles/global.css            # Design tokens + base reset
└── pages/
    ├── index.astro              # Home — hero, countdown, timeline, cards
    ├── rsvp.astro               # RSVP form with validation
    ├── programme.astro          # 3-day wedding schedule
    ├── dresscode.astro          # Dress code per event
    ├── decouvrir.astro          # Pont-Aven tourism guide
    ├── logements.astro          # Accommodations + transport
    ├── liste-mariage.astro      # Gift registry
    ├── galerie.astro            # Photo gallery (placeholder)
    └── contact.astro            # Phone numbers + address
public/images/                   # Couple photos
Dockerfile                       # Multi-stage: node build → caddy serve
fly.toml                         # Fly.io config (shared-cpu-1x, 256MB)
```
