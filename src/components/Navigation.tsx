import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="border-b border-omar-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="/"
            className="font-heading text-2xl text-omar-oud hover:text-omar-sand transition-colors"
          >
            Omar AlBeshr
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/books"
              className="text-omar-charcoal hover:text-omar-sand transition-colors font-medium"
            >
              Books
            </Link>
            <Link
              href="/blog"
              className="text-omar-charcoal hover:text-omar-sand transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-omar-charcoal hover:text-omar-sand transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
