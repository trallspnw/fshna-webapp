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

export abstract class Fetcher<T> {
  abstract get(slug: string): Promise<T | null>
  abstract getAll(): Promise<T[]>
  abstract getNavItems(): Promise<NavItem[]>
  abstract getGlobalData<U>(slug: string): Promise<U>

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