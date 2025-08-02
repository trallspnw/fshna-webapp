import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Fetcher, FetchOptions } from '@common/fetchers/fetcher'
import { NavItem } from '@common/types/nav'
import { Page } from '@common/types/payload-types'

/**
 * CMS fetcher for getting page and event information within the CMS application. Uses the Payload type for dynamic
 * rendering.
 * 
 * T is the type of the collection (such as Page, Event)
 */
export class CmsFetcher<T> extends Fetcher<T> {
  constructor(private collection: string) {
    super()
  }

  private async getPayloadInstance() {
    return await getPayload({ config: configPromise })
  }

  /**
   * Get content for a specific slug using the Payload type.
   * @param slug The slug of the content to get
   * @returns The content matching the requested slug
   */
  async get(slug: string): Promise<T | null> {
    const payload = await this.getPayloadInstance()
    const result = await payload.find({
      collection: this.collection,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as T) ?? null
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
    const payload = await this.getPayloadInstance()
    return await payload.findGlobal({ slug }) as U
  }

  /**
   * Get all content documents of a specified collection.
   * U is the type of the requested collection.
   * @param collection The collection to retrieve (pages, events)
   * @param options Limit and sort parameters
   * @returns All of the documents of type U
   */
  private async getAllOfType<U>(collection: string, options: FetchOptions = {}): Promise<U[]> {
    const payload = await this.getPayloadInstance()
    const { limit = 100, sortOptions } = options

    const sort = sortOptions
      ? `${sortOptions.sortOrder === 'desc' ? '-' : ''}${sortOptions.sortBy}`
      : undefined

    const result = await payload.find({
      collection,
      limit,
      ...(sort && { sort }),
    })

    return result.docs as U[]
  }
}
