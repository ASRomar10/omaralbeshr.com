// ISR cache configuration
// Next.js will revalidate pages every hour (3600 seconds)
export const CACHE_REVALIDATE = 3600;

// Request cache options for Notion queries
export const cacheOptions = {
  next: {
    revalidate: CACHE_REVALIDATE,
    tags: ['notion-data']
  }
};
