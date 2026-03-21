# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use              # Node 24 (required)
npm run dev          # Dev server at localhost:4321
npm run build        # Static build to dist/
npm run preview      # Preview production build
flyctl deploy        # Deploy to Fly.io
```

## Architecture

Static wedding website built with Astro 6, deployed as a Docker image (Caddy file server) on Fly.io. Pushes to `main` auto-deploy via GitHub Actions.

**Build output:** `format: 'file'` generates `/rsvp.html` (not `/rsvp/index.html`), so internal links use paths like `/rsvp` not `/rsvp/`.

**Layout:** `BaseLayout.astro` wraps every page — provides `<html>`, Google Fonts, global CSS import, `<Navbar>`, `<slot/>`, `<Footer>`, and the scroll fade-in observer script. Pages pass `title` and `activePage` props.

**Styles:** Design tokens live in `src/styles/global.css` (imported by BaseLayout). Page-specific and component-specific CSS uses Astro scoped `<style>` blocks. Key color variables: `--color-lavender`, `--color-orange`, `--color-purple-dark`, `--color-sky`, `--color-green`.

**Client JS:** Only two pages need client-side JS — `index.astro` (countdown timer via `<script>`) and `rsvp.astro` (form validation via `<script>`). Navbar toggle JS lives in `Navbar.astro`. Scroll animations use the `.fade-in` class observed by an IntersectionObserver in BaseLayout.

**All content is in French.** Preserve accented characters exactly when editing text.
