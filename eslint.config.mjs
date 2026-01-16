// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    vue: true,
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
    jsonc: true,
    yaml: true,
    markdown: true,
    ignores: [
      '.nuxt',
      '.output',
      'dist',
      'node_modules',
      'public',
    ],
  }),
)
