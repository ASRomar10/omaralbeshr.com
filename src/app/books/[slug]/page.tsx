import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBooks, getBookBySlug, getBookContent } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all published books
export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug);

  if (!book) {
    return {
      title: 'Book Not Found | Omar AlBeshr',
    };
  }

  return {
    title: `${book.title} | Omar AlBeshr`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: book.cover ? [book.cover] : [],
    },
  };
}

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  // Fetch book content (blocks) for rendering excerpts, reviews, etc.
  const blocks = await getBookContent(book.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: 'Omar AlBeshr',
      url: 'https://omaralbeshr.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: book.publisher,
    },
    datePublished: book.publishDate,
    description: book.description,
    image: book.cover,
    genre: book.genre,
    inLanguage: ['ar', 'en'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Back to Books */}
      <Link
        href="/books"
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
        Back to Books
      </Link>

      {/* Book Header */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Book Cover */}
        {book.cover && (
          <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0">
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover rounded-lg shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        {/* Book Information */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-omar-oud mb-4">
              {book.title}
            </h1>
            <p className="text-lg text-omar-muted">
              {book.publisher} • {new Date(book.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </p>
            {book.genre && (
              <p className="text-omar-sand font-medium mt-2">{book.genre}</p>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-omar-charcoal leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Purchase Links */}
          <div className="flex flex-wrap gap-4 pt-4">
            {book.amazonUrl && (
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-omar-sand text-white font-medium rounded-md hover:bg-omar-oud transition-colors"
              >
                Get Your Copy
              </a>
            )}
            {book.otherBuyLinks && (
              <a
                href={book.otherBuyLinks}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border-2 border-omar-sand text-omar-sand font-medium rounded-md hover:bg-omar-sand hover:text-white transition-colors"
              >
                Other Retailers
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Book Content (Notion blocks: excerpts, reviews, themes, etc.) */}
      {blocks.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <NotionRenderer blocks={blocks as any} />
          </div>
        </div>
      )}

      {/* Back to Books Footer */}
      <div className="text-center mt-16 pt-8 border-t border-omar-muted/30">
        <Link
          href="/books"
          className="inline-block px-8 py-3 border-2 border-omar-sand text-omar-sand font-medium rounded-md hover:bg-omar-sand hover:text-white transition-colors"
        >
          Explore More Books
        </Link>
      </div>
    </div>
    </>
  );
}
