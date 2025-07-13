import { NavItem } from '@/packages/common/src/types/nav'
import { Page } from '@/packages/common/src/types/payload-types'
import { Fetcher, FetchOptions } from '@common/fetchers/fetcher'

export class SiteFetcher<T> extends Fetcher<T> {
  constructor(private collection: string) {
    super()
  }

  async get(slug: string): Promise<T | null> {
    const result = await fetch(`${process.env.CMS_URL}/api/${this.collection}?where[slug][equals]=${slug}`)
    const data = await result.json()
    return (data.docs[0] as T) ?? null
  }

  async getAll(options: FetchOptions = {}): Promise<T[]> {
    return this.getAllOfType<T>(this.collection, options);
  }

  async getNavItems(): Promise<NavItem[]> {
    return this.mapPagesToNavItems(await this.getAllOfType<Page>('pages'))
  }

  async getGlobalData<U>(slug: string): Promise<U> {
    const result = await fetch(`${process.env.CMS_URL}/api/globals/${slug}`)
    const data = await result.json()
    return data as U
  }

  private async getAllOfType<U>(collection: string, options: FetchOptions = {}): Promise<U[]> {
    const url = new URL(`${process.env.CMS_URL}/api/${collection}`)
    url.searchParams.set('limit', String(options.limit ?? 100))

    if (options.sortOptions) {
      const { sortBy, sortOrder } = options.sortOptions
      url.searchParams.set('sort', `${sortOrder === 'desc' ? '-' : ''}${sortBy}`)
    }

    const res = await fetch(url.toString())
    const data = await res.json()
    return data.docs as U[]
  }
}
