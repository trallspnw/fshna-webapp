export abstract class Fetcher<T> {
  abstract get(slug: string): Promise<T>
  abstract getAll(): Promise<T[]>
}
