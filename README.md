<div align="center">

# itslouis.dev

[![CI](https://img.shields.io/github/actions/workflow/status/itsmelouis/itslouis.dev/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/itsmelouis/itslouis.dev/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Made with Nuxt](https://img.shields.io/badge/Made%20with-Nuxt-00DC82?style=flat-square&logo=nuxt&labelColor=020420)](https://nuxt.com)

My personal portfolio — a fast, accessible site with a blog and a project showcase.

Live at **[itslouis.dev](https://itslouis.dev)**.

[Stack](#stack) • [Quick Start](#quick-start) • [Scripts](#scripts)

</div>

## Stack

- **[Nuxt 4](https://nuxt.com)** — Vue framework, prerendered for static delivery
- **[Nuxt UI v4](https://ui.nuxt.com)** — components & theming
- **[Nuxt Content](https://content.nuxt.com)** — Markdown-powered blog
- **TypeScript** — `<script setup lang="ts">` everywhere
- **[@antfu/eslint-config](https://github.com/antfu/eslint-config)** — linting

## Quick Start

Requires [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

Install the dependencies:

```bash
pnpm install
```

Start the dev server on `http://localhost:3000`:

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev          # Start the dev server
pnpm build        # Build for production
pnpm preview      # Preview the production build locally
pnpm lint         # Lint with ESLint
pnpm typecheck    # Type-check with vue-tsc
```

## License

MIT © [Louis F.](https://github.com/itsmelouis)
