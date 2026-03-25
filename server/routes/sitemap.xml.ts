import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://itslouis.dev'

  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .select('path', 'date')
    .all()

  const staticPages = [
    { loc: baseUrl, priority: '1.0', changefreq: 'monthly' },
    { loc: `${baseUrl}/blog`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/projects`, priority: '0.7', changefreq: 'monthly' },
  ]

  const blogPages = posts.map(post => ({
    loc: `${baseUrl}${post.path}`,
    lastmod: post.date,
    priority: '0.9',
    changefreq: 'never',
  }))

  const allPages = [...staticPages, ...blogPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.loc}</loc>${'lastmod' in page && page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
