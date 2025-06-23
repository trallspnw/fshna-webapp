import { Fetcher, FetchOptions } from '@common/fetchers/fetcher'

export class SiteFetcher<T> extends Fetcher<T> {
  constructor(private collection: string) {
    super()
  }

  async get(slug: string): Promise<T | null> {
    const res = await fetch(`${process.env.CMS_URL}/api/${this.collection}?where[slug][equals]=${slug}`)
    const data = await res.json()
    return (data.docs[0] as T) ?? null
  }

  async getAll(options: FetchOptions = {}): Promise<T[]> {
    const url = new URL(`${process.env.CMS_URL}/api/${this.collection}`)
    url.searchParams.set('limit', String(options.limit ?? 100))

    if (options.sortOptions) {
      const { sortBy, sortOrder } = options.sortOptions
      url.searchParams.set('sort', `${sortOrder === 'desc' ? '-' : ''}${sortBy}`)
    }

    const res = await fetch(url.toString())
    const data = await res.json()
    return data.docs as T[]
  }
}
