import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostBySlug, getBlogPostContent } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Omar AlBeshr',
    };
  }

  return {
    title: `${post.title} | Omar AlBeshr`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Fetch post content (blocks) for rendering
  const blocks = await getBlogPostContent(post.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Person',
      name: 'Omar AlBeshr',
      url: 'https://omaralbeshr.com/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Omar AlBeshr',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://omaralbeshr.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-6 py-16">
      {/* Back to Blog */}
      <Link
        href="/blog"
        className="inline-flex items-center text-omar-sand hover:text-omar-oud transition-colors mb-8"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Reflections
      </Link>

      {/* Post Header */}
      <header className="mb-12">
        <h1 className="font-heading text-4xl md:text-5xl text-omar-oud mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-omar-muted mb-6">
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1.5 bg-omar-sand/10 text-omar-sand rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Featured Image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <NotionRenderer blocks={blocks as any} />
      </div>

      {/* Post Footer */}
      <footer className="mt-16 pt-8 border-t border-omar-muted/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-omar-sand hover:text-omar-oud font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            View All Posts
          </Link>

          {/* Share Links */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-omar-muted">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://omaralbeshr.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-omar-muted hover:text-omar-sand transition-colors"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://omaralbeshr.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-omar-muted hover:text-omar-sand transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </article>
    </>
  );
}
