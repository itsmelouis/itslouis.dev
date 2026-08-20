import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        date: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
        draft: z.boolean().default(false),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
        year: z.number().int(),
        order: z.number().int(),
        tags: z.array(z.string()),
        icon: z.string(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
      }),
    }),
  },
})
