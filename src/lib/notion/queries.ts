import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion, BOOKS_DB_ID, BLOG_DB_ID } from './client';
import { Book, BlogPost, pageToBook, pageToBlogPost } from './types';
import { cacheOptions } from './cache';

// Fetch all published books, sorted by SortOrder
export async function getBooks(): Promise<Book[]> {
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
}

// Fetch a single book by slug
export async function getBookBySlug(slug: string): Promise<Book | null> {
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
}

// Fetch book page content (blocks)
export async function getBookContent(pageId: string) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  return blocks.results;
}

// Fetch featured books
export async function getFeaturedBooks(): Promise<Book[]> {
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
}

// Fetch all published blog posts with pagination
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
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
}

// Fetch recent blog posts (for homepage)
export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  return getBlogPosts(count);
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
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
}

// Fetch blog post content (blocks)
export async function getBlogPostContent(pageId: string) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  return blocks.results;
}

// Fetch blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
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
}
