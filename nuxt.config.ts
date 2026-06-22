// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

// PartyKit endpoint that powers the live viewer count. Deployed cloud-prem to
// our own Cloudflare account (see partykit.json `domain`), so this matches the
// `--domain` we deploy to. Overridable via NUXT_PUBLIC_PARTYKIT_HOST.
const partykitHost = process.env.NUXT_PUBLIC_PARTYKIT_HOST || 'c.itslouis.dev'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: 'https://itslouis.dev',
      partykitHost,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/content',
    'nuxt-og-image',
  ],

  site: {
    url: 'https://itslouis.dev',
  },

  content: {
    experimental: {
      nativeSqlite: true,
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['vue', 'typescript', 'javascript', 'bash', 'yaml', 'json', 'css'],
        },
      },
    },
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  $production: {
    modules: ['nuxt-security'],
    security: {
      headers: {
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          'script-src-attr': ['\'self\'', '\'unsafe-inline\''],
          'script-src': ['\'self\'', '\'unsafe-inline\'', 'https://static.cloudflareinsights.com'],
          'img-src': ['\'self\'', 'data:', 'https://i.scdn.co'],
          'connect-src': ['\'self\'', 'https://ungh.cc', 'wss://api.lanyard.rest', `wss://${partykitHost}`, `https://${partykitHost}`],
        },
      },
      // CSP with per-script SHA hashes is delivered via <meta> in the prerendered HTML.
      // Skip exporting it to Cloudflare _headers — the line exceeds the 2000-char limit.
      ssg: {
        exportToPresets: false,
      },
    },
    ogImage: {
      zeroRuntime: true,
    },
    routeRules: {
      '/': { prerender: true },
      '/blog': { prerender: true },
      '/blog/**': { prerender: true },
      '/uses': { prerender: true },
      '/projects': { swr: 3600 },
      '/sitemap.xml': { prerender: true },
      // nuxt-security's per-route header export is disabled (see security.ssg above)
      // so the non-CSP security headers are set globally here instead.
      '/**': {
        headers: {
          'Cross-Origin-Resource-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Origin-Agent-Cluster': '?1',
          'X-DNS-Prefetch-Control': 'off',
          'Permissions-Policy': 'camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()',
        },
      },
    },
  },

  colorMode: {
    storage: 'cookie',
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      standalone: false,
    },
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
      ],
    },
  },

})
