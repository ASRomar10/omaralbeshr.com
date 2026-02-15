import { Client } from '@notionhq/client';

// Initialize with empty string if not set (will fail at runtime if actually used)
// This allows the build to succeed even without env vars configured
const NOTION_API_KEY = process.env.NOTION_API_KEY || '';

export const notion = new Client({
  auth: NOTION_API_KEY,
});

// Data source IDs (collection IDs) — different from database IDs
export const BOOKS_DB_ID = process.env.NOTION_BOOKS_DB_ID || '3089912e-d7bf-8129-8014-000b3c096fe9';
export const BLOG_DB_ID = process.env.NOTION_BLOG_DB_ID || '3089912e-d7bf-81db-9d46-000b2bf715aa';
