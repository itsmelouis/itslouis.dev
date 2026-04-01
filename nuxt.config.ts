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
    ogImage: {
      zeroRuntime: true,
    },
    routeRules: {
      '/': { prerender: true },
      '/blog': { prerender: true },
      '/blog/**': { prerender: true },
      '/projects': { swr: 3600 },
      '/sitemap.xml': { prerender: true },
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
