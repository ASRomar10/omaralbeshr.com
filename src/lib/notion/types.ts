import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Book type from Notion
export interface Book {
  id: string;
  title: string;
  slug: string;
  cover?: string;
  description: string;
  publishDate: string;
  publisher: string;
  amazonUrl?: string;
  otherBuyLinks?: string;
  genre: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
}

// Blog Post type from Notion
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt: string;
  publishDate: string;
  tags: string[];
  published: boolean;
  readingTime: number;
}

// Helper to extract property values from Notion pages
export function getPlainText(property: any): string {
  if (!property) return '';

  if (property.type === 'title') {
    return property.title.map((t: any) => t.plain_text).join('');
  }

  if (property.type === 'rich_text') {
    return property.rich_text.map((t: any) => t.plain_text).join('');
  }

  return '';
}

export function getDate(property: any): string {
  if (!property || property.type !== 'date' || !property.date) return '';
  return property.date.start;
}

export function getNumber(property: any): number {
  if (!property || property.type !== 'number') return 0;
  return property.number || 0;
}

export function getCheckbox(property: any): boolean {
  if (!property || property.type !== 'checkbox') return false;
  return property.checkbox || false;
}

export function getSelect(property: any): string {
  if (!property || property.type !== 'select' || !property.select) return '';
  return property.select.name || '';
}

export function getMultiSelect(property: any): string[] {
  if (!property || property.type !== 'multi_select') return [];
  return property.multi_select.map((s: any) => s.name);
}

export function getUrl(property: any): string {
  if (!property || property.type !== 'url') return '';
  return property.url || '';
}

export function getFiles(property: any): string | undefined {
  if (!property || property.type !== 'files' || !property.files.length) return undefined;
  const file = property.files[0];
  return file.type === 'external' ? file.external.url : file.file.url;
}

// Convert Notion page to Book
export function pageToBook(page: PageObjectResponse): Book {
  const props = page.properties;

  return {
    id: page.id,
    title: getPlainText(props.Title),
    slug: getPlainText(props.Slug),
    cover: getFiles(props.Cover),
    description: getPlainText(props.Description),
    publishDate: getDate(props.PublishDate),
    publisher: getPlainText(props.Publisher),
    amazonUrl: getUrl(props.AmazonURL),
    otherBuyLinks: getPlainText(props.OtherBuyLinks),
    genre: getSelect(props.Genre),
    published: getCheckbox(props.Published),
    featured: getCheckbox(props.Featured),
    sortOrder: getNumber(props.SortOrder),
  };
}

// Convert Notion page to BlogPost
export function pageToBlogPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  return {
    id: page.id,
    title: getPlainText(props.Title),
    slug: getPlainText(props.Slug),
    coverImage: getFiles(props.CoverImage),
    excerpt: getPlainText(props.Excerpt),
    publishDate: getDate(props.PublishDate),
    tags: getMultiSelect(props.Tags),
    published: getCheckbox(props.Published),
    readingTime: getNumber(props.ReadingTime),
  };
}
