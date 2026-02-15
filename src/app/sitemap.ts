import { MetadataRoute } from 'next'
import { getBlogPosts, getBooks } from '@/lib/notion'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://omaralbeshr.com'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic book routes
  const books = await getBooks()
  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
    lastModified: book.publishDate ? new Date(book.publishDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic blog routes
  const posts = await getBlogPosts()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishDate ? new Date(post.publishDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...bookRoutes, ...blogRoutes]
}
