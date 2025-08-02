import { Page } from '@common/types/payload-types'
import { BasePageHandler } from '@common/handlers/page'
import { SiteFetcher } from '@site/lib/siteFetcher'
import { RouteContext } from '@common/handlers/baseContent'

/**
 * Renders pages statically using the static SiteFetcher.
 */
class SitePageHandler extends BasePageHandler {
  protected readonly fetcher = new SiteFetcher<Page>(this.COLLECTION)
  protected readonly allFetchers = {
    page: this.fetcher,
    event: new SiteFetcher<Event>('events'),
  }

  /**
   * Gets all of the slugs for pages. Needed for static site generation.
   * @returns The slugs of all the pages
   */
  async generateStaticParams() {
    const pages = await this.fetcher.getAll()
    if (!Array.isArray(pages) || pages.length == 0) {
      console.warn(`No ${this.COLLECTION} found - skipping static params`)
      return [{ slug: '__fake__' }];
    }
    return pages.map((page) => ({ slug: page.slug }))
  }
}

const handler = new SitePageHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}

export async function generateStaticParams() {
  return handler.generateStaticParams()
}
