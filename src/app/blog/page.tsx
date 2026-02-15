import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'Blog | Omar AlBeshr',
  description: 'Reflections on writing, creativity, and the human experience',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl text-omar-oud mb-6">
          Reflections
        </h1>
        <p className="text-lg md:text-xl text-omar-muted max-w-2xl mx-auto">
          Thoughts on writing, creativity, and the journey of bringing words to life
        </p>
      </div>

      {/* Blog Archive */}
      {posts.length === 0 ? (
        <p className="text-center text-omar-muted">No posts available at the moment.</p>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="grid md:grid-cols-[300px_1fr] gap-8 pb-12 border-b border-omar-muted/30 last:border-0"
            >
              {/* Featured Image */}
              {post.coverImage && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </Link>
              )}

              {/* Post Content */}
              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="font-heading text-2xl md:text-3xl text-omar-oud group-hover:text-omar-sand transition-colors mb-3">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-omar-muted mb-3">
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 bg-omar-sand/10 text-omar-sand rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-omar-charcoal leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-omar-sand hover:text-omar-oud font-medium transition-colors"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
