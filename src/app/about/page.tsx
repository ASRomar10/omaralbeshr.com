import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Omar AlBeshr is an Emirati poet and author based in Abu Dhabi. Published author of "Taintlessness" working in Arabic and English.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Omar AlBeshr',
    description: 'Omar AlBeshr is an Emirati poet and author based in Abu Dhabi.',
    siteName: 'Omar AlBeshr',
    locale: 'en_US',
    type: 'profile',
    images: [{ url: '/images/omar-portrait.jpeg', width: 256, height: 256, alt: 'Omar AlBeshr' }],
  },
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://omaralbeshr.com/#person',
    name: 'Omar AlBeshr',
    alternateName: 'عمر البشر',
    url: 'https://omaralbeshr.com',
    image: 'https://omaralbeshr.com/images/omar-portrait.jpeg',
    jobTitle: 'Poet & Author',
    description: 'Emirati poet and author based in Abu Dhabi',
    nationality: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    knowsLanguage: ['ar', 'en'],
    mainEntityOfPage: 'https://omaralbeshr.com/about',
    sameAs: [
      'https://www.linkedin.com/in/omaralbeshr',
      'https://x.com/ASRomar10',
      'https://www.instagram.com/ASRomar10',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-omar-bg">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Portrait */}
              <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-omar-sand/20 border-4 border-omar-sand overflow-hidden">
                  <Image
                    src="/images/omar-portrait.jpeg"
                    alt="Portrait of Omar AlBeshr, Emirati poet and author"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover object-[center_15%]"
                    priority
                  />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center md:text-left">
                <h1 className="font-heading text-5xl md:text-6xl text-omar-oud mb-4">
                  About Omar
                </h1>
                <p className="font-body text-xl text-omar-charcoal/70">
                  Poet & Author
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Biography */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <p className="font-body text-lg text-omar-charcoal leading-relaxed mb-6">
                Omar AlBeshr is an Emirati poet and author based in Abu Dhabi. His creative practice spans poetry and prose, unified by a commitment to exploring the human experience.
              </p>

              <p className="font-body text-lg text-omar-charcoal leading-relaxed mb-6">
                In 2020, Omar published his debut work, <em>Taintlessness</em>, through Sail Publishing. The book reflects his introspective approach to narrative and his ability to navigate complex emotional landscapes with clarity and grace.
              </p>

              <p className="font-body text-lg text-omar-charcoal leading-relaxed mb-6">
                Working fluently in both Arabic and English, Omar brings a bilingual perspective to his creative output. His writing captures moments that reveal the quiet beauty found in everyday life.
              </p>

              <p className="font-body text-lg text-omar-charcoal leading-relaxed">
                Based in the cultural heart of the UAE, Omar continues to develop his craft, seeking always to create work that resonates with authenticity and purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Book CTA */}
        <section className="py-12 bg-omar-sand/5">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <p className="font-body text-lg text-omar-charcoal mb-6">
              Read Omar's debut poetry collection
            </p>
            <Link
              href="/books/taintlessness"
              className="inline-block px-8 py-3 bg-omar-sand text-white font-medium rounded-md hover:bg-omar-oud transition-colors"
            >
              Discover Taintlessness
            </Link>
          </div>
        </section>

        {/* Journey / Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="font-heading text-4xl text-omar-oud mb-12 text-center">
              Journey
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-omar-sand pl-6 py-2">
                <div className="font-heading text-lg text-omar-sand mb-2">2015–2020</div>
                <h3 className="font-heading text-xl text-omar-oud mb-2">Sail Magazine</h3>
                <p className="font-body text-omar-charcoal/80">
                  Published 11 articles covering language, science, psychology, and culture.
                </p>
              </div>

              <div className="border-l-4 border-omar-sand pl-6 py-2">
                <div className="font-heading text-lg text-omar-sand mb-2">2020</div>
                <h3 className="font-heading text-xl text-omar-oud mb-2">Published Taintlessness</h3>
                <p className="font-body text-omar-charcoal/80">
                  Debut publication with Sail Publishing, marking a significant milestone in literary work.
                </p>
              </div>

              <div className="border-l-4 border-omar-sand pl-6 py-2">
                <div className="font-heading text-lg text-omar-sand mb-2">2021</div>
                <h3 className="font-heading text-xl text-omar-oud mb-2">Fields of Poetry</h3>
                <p className="font-body text-omar-charcoal/80">
                  Collaborative poetry anthology featuring diverse voices, published through Sail Publishing.
                </p>
              </div>

              <div className="border-l-4 border-omar-sand pl-6 py-2">
                <div className="font-heading text-lg text-omar-sand mb-2">2023</div>
                <h3 className="font-heading text-xl text-omar-oud mb-2">Emarat TV Interview</h3>
                <p className="font-body text-omar-charcoal/80">
                  Featured on "Morning of the Emirates" discussing poetry and bridging Arabic and English literary traditions.
                </p>
              </div>

              <div className="border-l-4 border-omar-sand pl-6 py-2">
                <div className="font-heading text-lg text-omar-sand mb-2">Present</div>
                <h3 className="font-heading text-xl text-omar-oud mb-2">Based in Abu Dhabi</h3>
                <p className="font-body text-omar-charcoal/80">
                  Creating from the UAE's cultural capital, contributing to the region's growing creative landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="font-heading text-4xl text-omar-oud mb-8 text-center">
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
            <p className="font-body text-omar-charcoal/70 mt-4 text-center">
              Appearance on Emarat TV's "Morning of the Emirates" (صباح الإمارات) discussing poetry and literature — May 2023
            </p>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="font-heading text-4xl text-omar-oud mb-8">
              Connect
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/omaralbeshr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
              >
                <span>LinkedIn</span>
              </a>


              <a
                href="https://x.com/ASRomar10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
              >
                <span>X (Twitter)</span>
              </a>
              <a
                href="https://www.instagram.com/ASRomar10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-omar-oud text-white font-body rounded-lg hover:bg-omar-charcoal transition-colors"
              >
                <span>Instagram</span>
              </a>
              <a
                href="mailto:admin@omaralbeshr.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-omar-sand text-white font-body rounded-lg hover:bg-omar-oud transition-colors"
              >
                <span>Contact Me</span>
              </a>
            </div>

            <p className="font-body text-omar-charcoal/70 mt-8 max-w-2xl mx-auto">
              I welcome opportunities to collaborate, discuss creative work, or simply connect with fellow storytellers and artists.
              Feel free to reach out at <a href="mailto:admin@omaralbeshr.com" className="text-omar-sand hover:text-omar-oud transition-colors underline">admin@omaralbeshr.com</a>.
            </p>
          </div>
        </section>

        {/* Press Mentions */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="font-heading text-4xl text-omar-oud mb-8 text-center">
              Press & Features
            </h2>

            <div className="space-y-4">
              <a
                href="https://youtu.be/rzkN2Q_PLdM"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-white rounded-lg border border-omar-muted/20 hover:border-omar-sand/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg text-omar-oud group-hover:text-omar-sand transition-colors">
                      Emarat TV — صباح الإمارات (Morning of the Emirates)
                    </h3>
                    <p className="font-body text-omar-charcoal/70 mt-1">
                      Interview discussing poetry, reading, and bridging Arabic and English literary traditions.
                    </p>
                  </div>
                  <span className="text-sm text-omar-muted whitespace-nowrap">May 2023</span>
                </div>
              </a>
              <a
                href="https://sailemagazine.com/author/omar-albeshr/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-white rounded-lg border border-omar-muted/20 hover:border-omar-sand/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg text-omar-oud group-hover:text-omar-sand transition-colors">
                      Sail Magazine — Contributing Writer
                    </h3>
                    <p className="font-body text-omar-charcoal/70 mt-1">
                      11 published articles on language, science, psychology, and culture.
                    </p>
                  </div>
                  <span className="text-sm text-omar-muted whitespace-nowrap">2015–2020</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
