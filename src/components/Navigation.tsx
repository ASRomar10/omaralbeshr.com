'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navLinks = [
  { href: '/books', label: 'Books' },
  { href: '/articles', label: 'Articles' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="border-b border-omar-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="/"
            className="flex items-center gap-3 font-heading text-xl md:text-2xl text-omar-oud hover:text-omar-sand transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Logo className="w-7 h-7 md:w-8 md:h-8" />
            Omar AlBeshr
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors font-medium ${
                  pathname.startsWith(href)
                    ? 'text-omar-sand'
                    : 'text-omar-charcoal hover:text-omar-sand'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-omar-charcoal hover:text-omar-sand transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-omar-muted/20 mt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-3 rounded-md transition-colors font-medium ${
                    pathname.startsWith(href)
                      ? 'text-omar-sand bg-omar-sand/5'
                      : 'text-omar-charcoal hover:text-omar-sand hover:bg-omar-sand/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
