# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server on http://localhost:3000
pnpm build            # Build for production
pnpm preview          # Preview production build locally
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm typecheck        # Run TypeScript type checking
```

## Architecture

This is a Nuxt 4 personal portfolio site using the `/app` directory structure:

- **app/pages/** - File-based routing
- **app/components/** - Auto-imported Vue components
- **app/composables/** - Auto-imported composition functions
- **app/layouts/** - Page layouts (default.vue wraps all pages)
- **app/assets/css/main.css** - Global styles and custom theme

## Key Technologies

- **Nuxt 4** with experimental View Transition API enabled
- **Nuxt UI v4** for components (configured with "graphite" color theme in `app/app.config.ts`)
- **@antfu/eslint-config** - 2-space indent, single quotes
- **Icons** - Lucide (`i-lucide-*`) and Simple Icons (`i-simple-icons-*`) via Iconify

## Conventions

- Use `<script setup lang="ts">` in all Vue components
- Theme switching uses `useColorMode()` from Nuxt with View Transition API support in `useThemeToggle`
- Semantic HTML with proper ARIA attributes for accessibility (@nuxt/a11y module enabled)
- Home page is prerendered via `routeRules` in nuxt.config.ts

## Pull requests

- Always use `.github/pull_request_template.md` as the PR body. Fill in the sections (Linked issue, Type of change, Description) — do not substitute your own structure.
- PR titles follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
