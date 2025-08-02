import { NavItem } from '@/packages/common/src/types/nav'
import { Page } from '@/packages/common/src/types/payload-types'
import { Fetcher, FetchOptions } from '@common/fetchers/fetcher'

/**
 * Site fetcher for getting page and event information within the Site application. Uses the Payload API for static
 * rendering.
 * 
 * T is the type of the collection (such as Page, Event)
 */
export class SiteFetcher<T> extends Fetcher<T> {
  constructor(private collection: string) {
    super()
  }


  /**
   * Get content for a specific slug using the Payload type.
   * @param slug The slug of the content to get
   * @returns The content matching the requested slug
   */
  async get(slug: string): Promise<T | null> {
    const result = await fetch(`${process.env.BASE_URL}/api/${this.collection}?where[slug][equals]=${slug}`)
    const data = await result.json()
    return (data.docs[0] as T) ?? null
  }

  /**
   * Gets all of the content documents of type T
   * @param options Limit and sort parameters
   * @returns All of the document of type T
   */
  async getAll(options: FetchOptions = {}): Promise<T[]> {
    return this.getAllOfType<T>(this.collection, options);
  }

  /**
   * Gets the navigation items to render. Items are retrieved for the pages collection.
   * @returns The navigation items
   */
  async getNavItems(): Promise<NavItem[]> {
    return this.mapPagesToNavItems(await this.getAllOfType<Page>('pages'))
  }

  /**
   * Gets global configuration data by slug.
   * U is the type of the requested global.
   * @param slug The global data to retrieve (footer, general)
   * @returns The requests global data as type U
   */
  async getGlobalData<U>(slug: string): Promise<U> {
    const result = await fetch(`${process.env.BASE_URL}/api/globals/${slug}`)
    const data = await result.json()
    return data as U
  }

  /**
   * Get all content documents of a specified collection.
   * U is the type of the requested collection.
   * @param collection The collection to retrieve (pages, events)
   * @param options Limit and sort parameters
   * @returns All of the documents of type U
   */
  private async getAllOfType<U>(collection: string, options: FetchOptions = {}): Promise<U[]> {
    const url = new URL(`${process.env.BASE_URL}/api/${collection}`)
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
