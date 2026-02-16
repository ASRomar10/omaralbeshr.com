import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedBooks, getRecentBlogPosts } from '@/lib/notion';
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Omar AlBeshr — Poet & Author',
  description: 'Omar AlBeshr is an Emirati poet and author based in Abu Dhabi. Writing in Arabic and English, exploring themes of love, healing, and human connection.',
  openGraph: {
    title: 'Omar AlBeshr — Poet & Author',
    description: 'Emirati poet and author based in Abu Dhabi. Writing in Arabic and English.',
    type: 'website',
  },
};

export default async function Home() {
  // Fetch data in parallel
  const [featuredBooks, recentPosts] = await Promise.all([
    getFeaturedBooks(),
    getRecentBlogPosts(3),
  ]);

  const featuredBook = featuredBooks[0]; // Get the first featured book

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Omar AlBeshr',
    url: 'https://omaralbeshr.com',
    description: 'Emirati poet and author based in Abu Dhabi',
    author: {
      '@type': 'Person',
      name: 'Omar AlBeshr',
      url: 'https://omaralbeshr.com/about',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-omar-oud mb-6">
            Omar AlBeshr
          </h1>
          <p className="text-xl md:text-2xl text-omar-muted mb-12">
            Stories across languages, frames, and forms
          </p>
          <Link
            href="/books"
            className="inline-block px-8 py-3 bg-omar-sand text-white font-medium rounded-md hover:bg-omar-oud transition-colors"
          >
            Explore My Work
          </Link>
        </div>
      </section>

      {/* Featured Book Section */}
      {featuredBook && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-heading text-3xl md:text-4xl text-omar-oud text-center mb-12">
            Latest Work
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            {featuredBook.cover && (
              <div className="relative aspect-[3/4] max-w-sm mx-auto">
                <Image
                  src={featuredBook.cover}
                  alt={featuredBook.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}

            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-2xl md:text-3xl text-omar-oud mb-2">
                  {featuredBook.title}
                </h3>
                <p className="text-omar-muted">
                  {featuredBook.publisher}{featuredBook.publishDate ? ` • ${new Date(featuredBook.publishDate).getFullYear()}` : ''}
                </p>
              </div>

              <p className="text-lg text-omar-charcoal leading-relaxed">
                {featuredBook.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/books/${featuredBook.slug}`}
                  className="inline-block px-6 py-2.5 border-2 border-omar-sand text-omar-sand font-medium rounded-md hover:bg-omar-sand hover:text-white transition-colors"
                >
                  Read More
                </Link>
                {featuredBook.amazonUrl && (
                  <a
                    href={featuredBook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-omar-sand text-white font-medium rounded-md hover:bg-omar-oud transition-colors"
                  >
                    Get Your Copy
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 bg-omar-bg">
          <h2 className="font-heading text-3xl md:text-4xl text-omar-oud text-center mb-12">
            Recent Reflections
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Featured Image */}
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl text-omar-oud mb-2 group-hover:text-omar-sand transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-omar-muted mb-3">
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} • {post.readingTime} min read
                  </p>
                  <p className="text-omar-charcoal line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 border-2 border-omar-sand text-omar-sand font-medium rounded-md hover:bg-omar-sand hover:text-white transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </section>
      )}

      {/* Interview */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-heading text-3xl md:text-4xl text-omar-oud mb-8 text-center">
          Interview
        </h2>
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/rzkN2Q_PLdM?start=5534"
            title="Omar AlBeshr on صباح الإمارات — Emarat TV"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-omar-muted text-center mt-4">
          Emarat TV's "Morning of the Emirates" (صباح الإمارات) — May 2023
        </p>
      </section>

      {/* About Teaser */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-lg md:text-xl text-omar-charcoal leading-relaxed mb-8">
          Omar AlBeshr is an Emirati poet and author based in Abu Dhabi.
          He writes in both Arabic and English, exploring themes of love, healing, and human
          connection through poetry and prose. His work bridges cultures
          and traditions, contributing a contemporary Gulf voice to global literary conversations.
        </p>
        <Link
          href="/about"
          className="inline-block px-8 py-3 bg-omar-oud text-white font-medium rounded-md hover:bg-omar-sand transition-colors"
        >
          More About Omar
        </Link>
      </section>
    </div>
    </>
  );
}
