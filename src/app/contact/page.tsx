import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Omar AlBeshr — Emirati poet and author based in Abu Dhabi. For inquiries about collaborations, press, publishing, or speaking.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Omar AlBeshr',
    description: 'Get in touch with Omar AlBeshr for collaborations, press, publishing, or speaking inquiries.',
    siteName: 'Omar AlBeshr',
    locale: 'en_US',
    type: 'website',
  },
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://omaralbeshr.com/#person',
      name: 'Omar AlBeshr',
      email: 'admin@omaralbeshr.com',
      url: 'https://omaralbeshr.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-omar-bg">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl text-omar-oud mb-4 text-center">
              Contact
            </h1>
            <p className="font-body text-xl text-omar-charcoal/70 text-center mb-16">
              I'd love to hear from you.
            </p>

            <div className="space-y-12">
              {/* Email */}
              <div className="text-center">
                <h2 className="font-heading text-2xl text-omar-oud mb-4">Email</h2>
                <a
                  href="mailto:admin@omaralbeshr.com"
                  className="font-body text-xl text-omar-sand hover:text-omar-oud transition-colors underline"
                >
                  admin@omaralbeshr.com
                </a>
              </div>

              {/* What to reach out about */}
              <div className="bg-white rounded-lg border border-omar-muted/20 p-8">
                <h2 className="font-heading text-2xl text-omar-oud mb-6 text-center">
                  What I can help with
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-lg text-omar-oud mb-2">Publishing & Rights</h3>
                    <p className="font-body text-omar-charcoal/70">
                      Book rights, translations, and publishing inquiries.
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-lg text-omar-oud mb-2">Press & Media</h3>
                    <p className="font-body text-omar-charcoal/70">
                      Interviews, features, and media requests.
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-lg text-omar-oud mb-2">Speaking & Events</h3>
                    <p className="font-body text-omar-charcoal/70">
                      Readings, panels, and literary event appearances.
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-lg text-omar-oud mb-2">Collaborations</h3>
                    <p className="font-body text-omar-charcoal/70">
                      Creative projects, anthologies, and partnerships.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="text-center">
                <h2 className="font-heading text-2xl text-omar-oud mb-6">Connect</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/omaralbeshr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/ASRomar10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href="https://www.instagram.com/ASRomar10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://substack.com/@omaralbeshr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
                  >
                    Substack
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
