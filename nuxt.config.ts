// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: 'https://itslouis.dev',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/content',
  ],

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

  routeRules: {
    // Fully static — prerender at build time (Nuxt Content markdown)
    // Note: prerender causes _payload.json 500s in dev mode (expected, harmless)
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    // External GitHub API — serve cached SSR, revalidate every hour
    '/projects': { swr: 3600 },
    // Sitemap — cache 24h, regenerated on next request after expiry
    '/sitemap.xml': { swr: 86400 },
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
