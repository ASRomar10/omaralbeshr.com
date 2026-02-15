# Notion Database IDs

## Books DB
Database ID: 3089912e-d7bf-81df-bc54-f3911717e347
URL: https://www.notion.so/3089912ed7bf81dfbc54f3911717e347

**Sample Content:**
- Taintlessness (Poetry, Published, Featured)

## Blog Posts DB
Database ID: 3089912e-d7bf-813e-a05e-c7e70f7d2006
URL: https://www.notion.so/3089912ed7bf813ea05ec7e70f7d2006

**Sample Content:**
- The Art of Storytelling Across Mediums (Writing, Film - Jan 15, 2026)
- Poetry in the Modern World (Poetry, Culture - Feb 1, 2026)
- Abu Dhabi: A City of Stories (Culture, Personal - Feb 10, 2026)

---

## Database Schemas

### Books Database
- **Title** (title)
- **Slug** (rich_text)
- **Cover** (files)
- **Description** (rich_text)
- **PublishDate** (date)
- **Publisher** (rich_text)
- **AmazonURL** (url)
- **OtherBuyLinks** (rich_text)
- **Genre** (select: Poetry, Fiction, Non-Fiction, Photography)
- **Published** (checkbox)
- **Featured** (checkbox)
- **SortOrder** (number)

### Blog Posts Database
- **Title** (title)
- **Slug** (rich_text)
- **CoverImage** (files)
- **Excerpt** (rich_text)
- **PublishDate** (date)
- **Tags** (multi_select: Poetry, Writing, Film, Culture, Personal)
- **Published** (checkbox)
- **ReadingTime** (number)

## Integration Notes

Both databases are created in SAM's Hub workspace under Omar's Command Center page.

Use the `@notionhq/client` SDK with these IDs to fetch content:
```typescript
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Fetch books
const books = await notion.databases.query({
  database_id: '3089912e-d7bf-81df-bc54-f3911717e347',
  filter: { property: 'Published', checkbox: { equals: true } }
});

// Fetch blog posts
const posts = await notion.databases.query({
  database_id: '3089912e-d7bf-813e-a05e-c7e70f7d2006',
  filter: { property: 'Published', checkbox: { equals: true } },
  sorts: [{ property: 'PublishDate', direction: 'descending' }]
});
```
