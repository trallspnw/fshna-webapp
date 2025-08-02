import { Page } from '@common/types/payload-types'
import { BaseHomeHandler } from '@common/handlers/home'
import { SiteFetcher } from '@site/lib/siteFetcher'

/**
 * Renders the home page statically using the static SiteFetcher.
 */
class SiteHomeHandler extends BaseHomeHandler {
  protected readonly fetcher = new SiteFetcher<Page>(this.COLLECTION)
  protected readonly allFetchers = {
    page: this.fetcher,
    event: new SiteFetcher<Event>('events'),
  }
}

const handler = new SiteHomeHandler()

export default async function render() {
  return handler.render()
}

export async function generateMetadata() {
  return handler.generateMetadata()
}
