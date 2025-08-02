import { NavItem } from "@common/types/nav";
import { Page } from "@common/types/payload-types";

export type FetcherTypes = 'page' | 'event'
export type Fetchers = Record<FetcherTypes, Fetcher<any>>

export interface FetchOptions {
  limit?: number,
  sortOptions?: {
    sortBy: string,
    sortOrder: 'asc' | 'desc',
  },
}

/**
 * Generic Fetcher for getting renderable content from the payload DB. Site (static) and CMS (dynamic) require different
 * implementations for fetching data. This generic fetcher provides shared logic and a common interface for use in 
 * shared components. 
 */
export abstract class Fetcher<T> {

  /**
   * Get content for a specific slug.
   * @param slug The slug of the content to get
   * @returns The content matching the requested slug
   */
  abstract get(slug: string): Promise<T | null>

  /**
   * Gets all of the content documents of type T
   * @param options Limit and sort parameters
   * @returns All of the document of type T
   */
  abstract getAll(): Promise<T[]>

  /**
   * Gets the navigation items to render. Items are retrieved for the pages collection.
   * @returns The navigation items
   */
  abstract getNavItems(): Promise<NavItem[]>

  /**
   * Gets global configuration data by slug.
   * U is the type of the requested global.
   * @param slug The global data to retrieve (footer, general)
   * @returns The requests global data as type U
   */  
  abstract getGlobalData<U>(slug: string): Promise<U>

  /**
   * Converts a list of Page documents to nav item details sorted by navigation order.
   * @param pages A list of Page documents
   * @returns A list of nav item details
   */
  protected async mapPagesToNavItems(pages: Page[]): Promise<NavItem[]> {
    return pages.filter((page) => page.showInNav)
      .sort((a, b) => {
        return (a.navigationOptions?.navOrder ?? Infinity) - (b.navigationOptions?.navOrder ?? Infinity)
      })
      .map((page) => {
        return {
          href: `/${page.slug}`,
          label: page.navigationOptions!.navLabel
        }
      });
  }
}