import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-omar-muted/20 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-xl text-omar-oud mb-3">
              Omar AlBeshr
            </h3>
            <p className="text-omar-muted text-sm leading-relaxed">
              Stories across languages, frames, and forms
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-omar-charcoal mb-3">
              Explore
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/books"
                className="text-omar-muted hover:text-omar-sand transition-colors text-sm"
              >
                Books
              </Link>
              <Link
                href="/blog"
                className="text-omar-muted hover:text-omar-sand transition-colors text-sm"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-omar-muted hover:text-omar-sand transition-colors text-sm"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="font-semibold text-omar-charcoal mb-3">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/omaralbeshr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-omar-muted hover:text-omar-sand transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/ASRomar10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-omar-muted hover:text-omar-sand transition-colors text-sm"
              >
                X (Twitter)
              </a>
              <a
                href="https://www.instagram.com/ASRomar10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-omar-muted hover:text-omar-sand transition-colors text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-omar-muted/20">
          <p className="text-omar-muted text-sm text-center">
            © {currentYear} Omar AlBeshr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
