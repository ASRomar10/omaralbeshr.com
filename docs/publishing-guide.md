# Publishing Guide for Omar AlBeshr's Website

This guide explains how to add books and blog posts to your website using Notion as your content management system.

## Prerequisites

Before you start, ensure:
1. You have access to your Notion workspace
2. Your Books and Blog Posts databases are set up (they should already exist)
3. The Notion API integration is connected to both databases

## Database IDs

Your databases:
- **Books Database**: `3089912e-d7bf-81df-bc54-f3911717e347`
- **Blog Posts Database**: `3089912e-d7bf-813e-a05e-c7e70f7d2006`

## Adding a New Book

1. Open the Books database in Notion
2. Click "+ New" to create a new entry
3. Fill in the required fields:

### Required Fields
- **Title**: The book's title (e.g., "Taintlessness")
- **Slug**: URL-friendly version (e.g., "taintlessness" - lowercase, hyphens instead of spaces)
- **Description**: A brief description of the book (1-3 paragraphs)
- **PublishDate**: When the book was published
- **Publisher**: Publisher name (e.g., "Sail Publishing")
- **Genre**: Select from the dropdown (e.g., "Poetry", "Fiction", "Non-fiction")
- **Published**: ✅ Check this box to make the book visible on your website
- **SortOrder**: Number to control the display order (lower numbers appear first)

### Optional Fields
- **Cover**: Upload a book cover image (recommended for best appearance)
- **Featured**: ✅ Check to feature this book on the homepage
- **AmazonURL**: Link to Amazon or other primary purchase location
- **OtherBuyLinks**: Additional purchase links

### Adding Book Content
The body of the Notion page can include:
- Excerpts from the book
- Reviews and testimonials
- Themes and topics explored
- Author notes

This content will appear on the book's detail page.

## Adding a Blog Post

1. Open the Blog Posts database in Notion
2. Click "+ New" to create a new entry
3. Fill in the required fields:

### Required Fields
- **Title**: The post title
- **Slug**: URL-friendly version (e.g., "on-writing-poetry")
- **Excerpt**: A brief summary (1-2 sentences) shown in post previews
- **PublishDate**: When to publish the post
- **Published**: ✅ Check this box to make the post visible on your website
- **ReadingTime**: Estimated reading time in minutes (e.g., 5)

### Optional Fields
- **CoverImage**: Upload a featured image for the post
- **Tags**: Add relevant tags (e.g., "Writing", "Poetry", "Reflection")

### Writing the Post
The body of the Notion page is your blog post content. You can use:
- Headings (H1, H2, H3)
- Paragraphs
- Lists (bulleted and numbered)
- Images
- Quotes
- Code blocks

The NotionRenderer component will automatically format these elements for your website.

## Publishing Workflow

After adding or editing content in Notion:

### Option 1: Wait for Auto-Refresh (Recommended)
The website automatically refreshes content every hour. Your changes will appear within 60 minutes.

### Option 2: Manual Revalidation (Instant)
To see changes immediately:

1. Get the revalidation secret from Vercel environment variables (`REVALIDATION_SECRET`)
2. Make a POST request to: `https://omaralbeshrcom.vercel.app/api/revalidate`
3. Include this JSON body:
```json
{
  "secret": "YOUR_REVALIDATION_SECRET",
  "paths": ["/", "/books", "/blog"]
}
```

Example using curl:
```bash
curl -X POST https://omaralbeshrcom.vercel.app/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "YOUR_SECRET_HERE",
    "paths": ["/", "/books", "/blog"]
  }'
```

### Paths to Revalidate

Depending on what you changed:
- **Added/edited a book**: `["/", "/books", "/books/BOOK_SLUG"]`
- **Added/edited a blog post**: `["/", "/blog", "/blog/POST_SLUG"]`
- **Updated anything**: `["/"]` (revalidates homepage which shows featured content)

## Content Best Practices

### Book Descriptions
- Keep descriptions concise but compelling
- Focus on what makes the book unique
- Include genre and themes
- Mention any awards or notable recognition

### Blog Post Writing
- Use clear, engaging titles
- Write conversational, authentic content
- Include relevant images to break up text
- Use headings to organize long posts
- Add tags to help readers discover related content

### Images
- **Book covers**: Minimum 600x900px, ideally 1200x1800px
- **Blog featured images**: Minimum 1200x630px (16:9 aspect ratio works well)
- Upload images directly to Notion for automatic hosting

### Slugs
- Use lowercase letters only
- Replace spaces with hyphens
- Avoid special characters
- Keep them short but descriptive
- Examples: `taintlessness`, `on-writing`, `journey-of-a-poet`

## Troubleshooting

### Content not appearing?
1. Check that **Published** is checked (✅)
2. Wait up to 1 hour for auto-refresh, or trigger manual revalidation
3. Verify the **Slug** field is filled and unique
4. Check that required fields are completed

### Images not loading?
1. Ensure images are uploaded directly to Notion (not external links)
2. Check image file size (keep under 5MB for best performance)
3. Wait for cache to refresh (up to 1 hour)

### Book not showing as featured on homepage?
1. Verify **Featured** box is checked
2. Ensure **Published** is also checked
3. Check **SortOrder** - featured books display in ascending order

## Need Help?

For technical issues or questions about the website:
- Check the website's GitHub repository
- Contact your web developer
- Review Notion's database documentation

For content-related decisions:
- Consider your audience and brand voice
- Review analytics to see what content performs well
- Maintain consistency with your existing work

---

**Pro Tip**: Draft posts can be created with **Published** unchecked. This lets you work on content in Notion without it appearing on the live site until you're ready to publish.
