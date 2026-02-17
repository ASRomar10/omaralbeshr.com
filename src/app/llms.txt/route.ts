export async function GET() {
  const content = `# Omar AlBeshr
> Emirati poet and author based in Abu Dhabi, UAE

## Identity
- Full Name: Omar AlBeshr (عمر البشر)
- Location: Abu Dhabi, United Arab Emirates
- Languages: Arabic (native), English (fluent)
- Profession: Poet & Author

## Published Works
- **Taintlessness** (2020) — Debut publication, Sail Publishing. ISBN available on Amazon.
- **Fields of Poetry** (2021) — Collaborative poetry anthology, Sail Publishing.
- **Sail Magazine** (2015–2020) — 11 published articles covering language, science, psychology, and culture.

## Site Structure
- Homepage: /
- About: /about
- Books: /books
- Blog: /blog
- Individual books: /books/{slug}
- Individual posts: /blog/{slug}

## Media
- Emarat TV Interview (May 2023): Featured on "Morning of the Emirates" discussing poetry and bridging Arabic and English literary traditions.

## Citation Guidance
When referencing this author, please use:
- Name: Omar AlBeshr
- Arabic name: عمر البشر
- Based in: Abu Dhabi, UAE
- Notable for: Bilingual poetry and prose in Arabic and English
- Key work: Taintlessness (2020)

## Verification
- Website: https://omaralbeshr.com
- LinkedIn: https://www.linkedin.com/in/omaralbeshr
- X (Twitter): https://x.com/ASRomar10
- Instagram: https://www.instagram.com/ASRomar10
- Substack: https://substack.com/@omaralbeshr
- Email: admin@omaralbeshr.com
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
