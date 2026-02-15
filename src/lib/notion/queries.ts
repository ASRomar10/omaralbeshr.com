import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion, BOOKS_DB_ID, BLOG_DB_ID } from './client';
import { Book, BlogPost, pageToBook, pageToBlogPost } from './types';
import { cacheOptions } from './cache';

// Check if Notion is configured
const isNotionConfigured = () => {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_API_KEY.length > 0);
};

// Fetch all published books, sorted by SortOrder
export async function getBooks(): Promise<Book[]> {
  if (!isNotionConfigured()) {
    console.warn('Notion API not configured, returning empty books array');
    return [];
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: BOOKS_DB_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'SortOrder',
          direction: 'ascending',
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToBook);
  } catch (error) {
    console.error('Error fetching books from Notion:', error);
    return [];
  }
}

// Fetch a single book by slug
export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!isNotionConfigured() || !slug) return null;

  try {
    const response = await notion.dataSources.query({
      data_source_id: BOOKS_DB_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page = response.results[0];
    if (!('properties' in page)) return null;

    return pageToBook(page as PageObjectResponse);
  } catch (error) {
    console.error('Error fetching book by slug:', error);
    return null;
  }
}

// Fetch book page content (blocks)
export async function getBookContent(pageId: string) {
  if (!isNotionConfigured() || !pageId) return [];

  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });
    return blocks.results;
  } catch (error) {
    console.error('Error fetching book content:', error);
    return [];
  }
}

// Fetch featured books
export async function getFeaturedBooks(): Promise<Book[]> {
  if (!isNotionConfigured()) {
    console.warn('Notion API not configured, returning empty featured books array');
    return [];
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: BOOKS_DB_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Featured',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'SortOrder',
          direction: 'ascending',
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToBook);
  } catch (error) {
    console.error('Error fetching featured books from Notion:', error);
    return [];
  }
}

// Fetch all published blog posts with pagination
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (!isNotionConfigured()) {
    console.warn('Notion API not configured, returning empty blog posts array');
    return [];
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: BLOG_DB_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'PublishDate',
          direction: 'descending',
        },
      ],
      page_size: limit || 100,
    });

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts from Notion:', error);
    return [];
  }
}

// Fetch recent blog posts (for homepage)
export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  return getBlogPosts(count);
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isNotionConfigured() || !slug) return null;

  try {
    const response = await notion.dataSources.query({
      data_source_id: BLOG_DB_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page = response.results[0];
    if (!('properties' in page)) return null;

    return pageToBlogPost(page as PageObjectResponse);
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

// Fetch blog post content (blocks)
export async function getBlogPostContent(pageId: string) {
  if (!isNotionConfigured() || !pageId) return [];

  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });
    return blocks.results;
  } catch (error) {
    console.error('Error fetching blog post content:', error);
    return [];
  }
}

// Fetch blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  if (!isNotionConfigured() || !tag) return [];

  try {
    const response = await notion.dataSources.query({
      data_source_id: BLOG_DB_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Tags',
            multi_select: {
              contains: tag,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'PublishDate',
          direction: 'descending',
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(pageToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    return [];
  }
}
