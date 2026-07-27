# AGENTS.md

Project guidance for coding agents working in this repository. Keep these instructions tool-agnostic so the project does not depend on a specific agent or vendor.

## Project

`itslouis.dev` is a Nuxt 4 personal portfolio with a Nuxt Content blog, project showcase, and PartyServer-powered live viewer count.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start the Nuxt dev server at http://localhost:3000
pnpm build            # Build for production
pnpm preview          # Preview the production build
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm typecheck        # Run Nuxt TypeScript checks
pnpm party:dev        # Run the PartyServer worker locally
pnpm party:deploy     # Deploy the PartyServer worker
```

## Architecture

- `app/pages/` — file-based routes
- `app/components/` — auto-imported Vue components
- `app/composables/` — auto-imported composables
- `app/layouts/` — application layouts
- `app/middleware/` — route middleware
- `app/plugins/` — Nuxt plugins
- `app/assets/css/main.css` — global styles and theme rules
- `content/blog/` — Markdown blog posts managed by Nuxt Content
- `party/` — PartyServer worker and Wrangler configuration
- `nuxt.config.ts` — modules, security headers, route rules, and runtime configuration

## Stack

- Nuxt 4 and Vue 3 with TypeScript
- Nuxt UI v4 with the `graphite` color theme
- Nuxt Content v3
- Nuxt A11y and Nuxt Security
- PartyServer and Cloudflare Workers
- `@antfu/eslint-config`
- Iconify icons, primarily `i-lucide-*` and `i-simple-icons-*`

## Conventions

- Use `<script setup lang="ts">` in Vue components.
- Follow the existing 2-space indentation and single-quote style.
- Prefer Nuxt and Vue auto-imports over explicit imports where supported.
- Prefer existing Nuxt UI components and project patterns before adding custom abstractions.
- Use semantic HTML and preserve accessibility labels, keyboard behavior, focus states, and reduced-motion support.
- Theme switching is handled by `useColorMode()` through `useThemeToggle`, including a View Transition API enhancement.
- Keep production-only configuration inside the existing `$production` block when appropriate.
- Use any relevant available skills or specialized instructions for Nuxt, Vue, Nuxt UI, content, motion, or frontend design work before implementing changes.

## Zed

Project tasks live in `.zed/tasks.json` and are available from Zed's task picker. Keep them aligned with the scripts in `package.json`.

## Validation

Run the checks relevant to the change. For application code, the default validation is:

```bash
pnpm lint
pnpm typecheck
```

Run `pnpm build` when changing Nuxt configuration, routing, content generation, server behavior, or production output.

## Git and pull requests

- Do not commit changes unless explicitly requested.
- Use Conventional Commits for commit and pull request titles.
- Always use `.github/pull_request_template.md` for pull request descriptions and fill in its Linked issue, Type of change, and Description sections.
