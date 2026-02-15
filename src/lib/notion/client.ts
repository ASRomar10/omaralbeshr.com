import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined in environment variables');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const BOOKS_DB_ID = process.env.NOTION_BOOKS_DB_ID || '3089912e-d7bf-81df-bc54-f3911717e347';
export const BLOG_DB_ID = process.env.NOTION_BLOG_DB_ID || '3089912e-d7bf-813e-a05e-c7e70f7d2006';
