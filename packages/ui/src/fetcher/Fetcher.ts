export abstract class Fetcher<T> {
  abstract getBySlug(slug: string): Promise<T | null>
  abstract getAll(): Promise<T[]>
}
