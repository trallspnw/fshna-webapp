import { BaseEventHandler } from '@common/handlers/event'
import { SiteFetcher } from '@site/lib/siteFetcher'
import { Event, Page } from '@common/types/payload-types'
import { RouteContext } from '@common/handlers/baseContent'

/**
 * Renders event pages statically using the static SiteFetcher.
 */
class SiteEventHandler extends BaseEventHandler {
  protected readonly fetcher = new SiteFetcher<Event>(this.COLLECTION)
    protected readonly allFetchers = {
    page: new SiteFetcher<Page>('pages'),
    event: this.fetcher,
  }

  /**
   * Gets all of the slugs for events. Needed for static site generation.
   * @returns The slugs of all the events
   */
  async generateStaticParams() {
    const events = await this.fetcher.getAll()
    if (!Array.isArray(events) || events.length == 0) {
      console.warn(`No ${this.COLLECTION} found - skipping static params`)
      return [{ slug: '__fake__' }];
    }
    return events.map((event) => ({ slug: event.slug }))
  }
}

const handler = new SiteEventHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}

export async function generateStaticParams() {
  return handler.generateStaticParams()
}
