# Omar AlBeshr Brand Brief
*For omaralbeshr.com redesign — February 2026*

## 1. Positioning Statement

**Omar AlBeshr is an Emirati author and photographer based in Abu Dhabi who bridges cultures through bilingual storytelling.** His work spans poetry collections (*Taintlessness*, Sail Publishing 2020), visual narratives, and film, exploring universal themes of love, healing, and human connection through both Arabic and English. He represents a new generation of Gulf creatives who honor traditional poetic forms while embracing contemporary digital storytelling.

**What makes Omar unique:**
- Bilingual poet writing in both Arabic and English, navigating two poetic traditions
- Multi-disciplinary creator combining literary, visual, and cinematic arts
- Emirati voice contributing to global literary conversations from Abu Dhabi
- Published author with proven work (Taintlessness) and active creative practice

## 2. Tagline Options

### Option 1: "Stories across languages, frames, and forms"
*Rationale: Captures his bilingual writing (Arabic/English), photography (frames), and multi-medium approach (forms). Literary but accessible.*

### Option 2: "An Emirati voice in poetry, image, and film"
*Rationale: Leads with cultural identity, then lists his three core mediums. Direct and authentic to who he is.*

### Option 3: "Bridging Abu Dhabi and the world through words and vision"
*Rationale: Emphasizes his geographic/cultural origin while highlighting his global reach. Romantic and literary tone.*

**Recommendation:** Option 1 for the homepage hero. It's memorable, slightly poetic, and immediately communicates his range without being too literal.

## 3. Tone of Voice

### Primary Characteristics
- **Literary but accessible** — elevated language without pretension; invites readers in rather than gatekeeping
- **Intimate yet professional** — personal stories and reflections balanced with polish and craft
- **Culturally grounded, globally minded** — proud of Emirati identity while speaking to universal human experiences
- **Reflective and contemplative** — thoughtful pacing; not rushed or salesy

### Voice Guidelines by Context
- **Book descriptions:** Evocative, sensory language. Focus on emotional journey, not plot summary.
- **Blog posts:** Conversational first-person. Share process, insights, vulnerabilities. Teach and inspire.
- **About page:** Warm, humble autobiography. Achievements mentioned naturally, not listed boastfully.
- **CTAs:** Gentle invitations, not hard sells. "Explore Taintlessness" vs "Buy Now!"

### What to Avoid
- Corporate/business jargon
- Overly academic or theoretical language
- Self-aggrandizing statements
- Generic "writer" clichés (e.g., "wordsmith," "passionate about storytelling")

## 4. Color Palette

### Primary Palette (Light/Minimal Foundation)

**Background:**
- Warm White: `#FAFAF8` (off-white with slight warmth, paper-like)
- Tailwind: `bg-[#FAFAF8]`

**Primary Accent (Desert Sand):**
- `#C4A57B` (warm, earthy gold — evokes UAE landscape, sophisticated)
- Tailwind: `text-[#C4A57B]` / `bg-[#C4A57B]`
- Use for: CTAs, links, section accents, hover states

**Secondary Accent (Deep Oud):**
- `#3E3632` (rich dark brown, grounded and literary)
- Tailwind: `text-[#3E3632]` / `bg-[#3E3632]`
- Use for: Headings, important UI elements, footer

**Body Text:**
- Charcoal: `#2C2C2C` (near-black, softer than pure black for readability)
- Tailwind: `text-[#2C2C2C]`

**Muted Text:**
- Warm Gray: `#6B6B6B` (secondary text, captions, metadata)
- Tailwind: `text-[#6B6B6B]`

### Tailwind Config Values
```js
// tailwind.config.ts
colors: {
  'omar-bg': '#FAFAF8',
  'omar-sand': '#C4A57B',
  'omar-oud': '#3E3632',
  'omar-charcoal': '#2C2C2C',
  'omar-muted': '#6B6B6B',
}
```

**Rationale:** This palette evokes warm desert tones rooted in UAE landscape while maintaining clean, literary minimalism. The warm neutrals reduce eye strain compared to pure white/black. The sand accent adds visual interest without overwhelming content.

## 5. Typography

### Heading Font: **Libre Baskerville**
- Google Font: `Libre Baskerville` (weights: 400, 700)
- Tailwind: `font-heading`
- **Why:** Libre Baskerville is a crisp, traditional serif designed specifically for screen readability with taller x-height and wider counters. It gives a timeless, literary feel perfect for poetry and prose. More readable than Playfair Display for long-form content while maintaining elegance.

### Body Font: **Inter**
- Google Font: `Inter` (weights: 400, 500, 600)
- Tailwind: `font-body`
- **Why:** Inter is a modern, highly legible sans-serif designed for UI and long-form reading. Variable font technology ensures perfect rendering at all sizes. Its neutral, clean appearance lets Omar's words shine without typographic distraction.

### Font Pairing Example
```tsx
// next/font/google setup
import { Libre_Baskerville, Inter } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

// Tailwind config
fontFamily: {
  heading: ['var(--font-heading)', 'serif'],
  body: ['var(--font-body)', 'sans-serif'],
}
```

**Pairing Rationale:** Libre Baskerville (serif) + Inter (sans-serif) creates classic editorial hierarchy. The serif headings signal literary quality while sans-serif body ensures comfortable digital reading.

## 6. Page-by-Page Copy Direction

### **Home Page**

**Primary Goal:** Establish Omar's multi-faceted identity and invite exploration of his work

**Structure:**
1. **Hero Section**
   - Full-viewport or 80vh height
   - Heading: Omar's name in Libre Baskerville (large, 3-4rem)
   - Tagline: "Stories across languages, frames, and forms" (Inter, muted color)
   - Minimal portrait or abstract visual (avoid stock photography)
   - CTA: "Explore My Work" (soft, exploratory language)

2. **Featured Book Section**
   - Section heading: "Latest Work" or "From the Collection"
   - *Taintlessness* book cover (prominent, high-quality image)
   - Brief description: 2-3 sentences about the book's themes (love, pain, healing)
   - Quote/excerpt: Pull one powerful line from the collection
   - CTAs: "Read More About Taintlessness" + "Get Your Copy" (external link to Sail Publishing)
   - **Tone:** Evocative, not salesy. Let the poetry speak.

3. **Latest Blog Posts** (3 recent)
   - Section heading: "Recent Reflections" or "From the Journal"
   - Card layout with featured image, title, excerpt, reading time
   - CTA: "Read More" per post + "View All Posts" to blog archive

4. **About Teaser**
   - Short paragraph (3-4 sentences) introducing Omar
   - Focus on identity: Emirati, bilingual, multi-disciplinary
   - CTA: "More About Omar"

**Key CTAs:** "Explore My Work" (hero), "Get Your Copy" (book), "Read Recent Posts" (blog), "Connect with Omar" (about)

---

### **Books Page**

**Primary Goal:** Showcase published work and drive book sales

**Structure:**
1. **Page Hero** — Heading: "Books" + brief statement about literary work
2. **Book Grid** — Future-ready grid (currently Taintlessness only) with cover, title, year, description, pull quotes
3. **Individual Book Pages** (`/books/taintlessness`) — Large cover, full description, themes, excerpt, purchase links, reviews, related posts

**Key CTAs:** "Get Your Copy" (to Sail Publishing), "Read a Sample", "Explore More Books"

**Messaging:** Focus on what readers will *feel* and *experience*. Use sensory, evocative language. Stay true to literary voice.

---

### **Blog Page**

**Primary Goal:** Drive engagement with ongoing creative practice and build audience

**Structure:**
1. **Page Hero** — Heading: "Reflections" or "Journal" + what readers can expect
2. **Blog Archive** — Chronological grid with title, date, reading time, excerpt, tags, pagination
3. **Individual Post** — Title, date, reading time, body (Notion-rendered), tags, share links, related posts

**Key CTAs:** "Read More", "Subscribe for Updates", "Explore Related Posts"

**Messaging:** First-person, conversational but literary. Share process and experiments.

---

### **About Page**

**Primary Goal:** Build connection and trust; humanize Omar beyond his work

**Structure:**
1. **Page Hero** — Portrait photo + heading
2. **Biography** (3-4 paragraphs) — Who he is today, journey to creative work, current projects, what drives him
3. **Key Facts** — Location, published work, languages, mediums
4. **Social/Contact Links** — LinkedIn, 500px, email

**Key CTAs:** "Read My Work" (to Books), "Explore Recent Reflections" (to Blog), "Get in Touch"

**Messaging:** Warm, humble. Lead with identity/values, not achievements. End with invitation to connect.

---

## Implementation Notes

1. **Content Priority:** Books and Blog are primary conversion paths. Home page directs to both.
2. **Visual Strategy:** Use Omar's photography where appropriate. White space is a design element.
3. **Bilingual Consideration:** Plan for future Arabic/English toggle but not required for launch.
4. **Performance:** Optimize all images (next/image), minimize JS, target 90+ Lighthouse score.
