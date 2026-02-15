import Image from 'next/image';
import Link from 'next/link';
import { getBooks } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'Books | Omar AlBeshr',
  description: 'Explore poetry collections and literary works by Omar AlBeshr',
};

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl text-omar-oud mb-6">
          Books
        </h1>
        <p className="text-lg md:text-xl text-omar-muted max-w-2xl mx-auto">
          Poetry and prose exploring themes of love, healing, and the human experience
          through both Arabic and English verse
        </p>
      </div>

      {/* Book Grid */}
      {books.length === 0 ? (
        <p className="text-center text-omar-muted">No books available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              className="group"
            >
              {/* Book Cover */}
              {book.cover && (
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Book Details */}
              <div className="space-y-2">
                <h2 className="font-heading text-2xl text-omar-oud group-hover:text-omar-sand transition-colors">
                  {book.title}
                </h2>
                <p className="text-sm text-omar-muted">
                  {book.publisher}{book.publishDate ? ` • ${new Date(book.publishDate).getFullYear()}` : ''}
                </p>
                {book.genre && (
                  <p className="text-sm text-omar-sand font-medium">{book.genre}</p>
                )}
                <p className="text-omar-charcoal line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
