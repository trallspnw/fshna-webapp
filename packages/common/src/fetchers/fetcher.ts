export interface FetchOptions {
  limit?: number,
  sortOptions?: {
    sortBy: string,
    sortOrder: 'asc' | 'desc',
  },
}

export abstract class Fetcher<T> {
  abstract get(slug: string): Promise<T | null>
  abstract getAll(): Promise<T[]>
}
