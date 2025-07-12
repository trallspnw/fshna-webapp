import { Page } from '@common/types/payload-types'
import { BaseNotFoundHandler } from '@common/handlers/not-found'
import { SiteFetcher } from '@site/lib/siteFetcher'

class SiteNotFoundHandler extends BaseNotFoundHandler {
  protected readonly fetcher = new SiteFetcher<Page>(this.COLLECTION)
  protected readonly allFetchers = {
    page: this.fetcher,
    event: new SiteFetcher<Event>('events'),
  }
}

const handler = new SiteNotFoundHandler()

export default async function render() {
  return handler.render()
}

export async function generateMetadata() {
  return handler.generateMetadata()
}
