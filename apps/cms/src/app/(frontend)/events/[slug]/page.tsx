import { BaseEventHandler } from '@common/handlers/event'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Event, Page } from '@common/types/payload-types'
import { RouteContext } from '@common/handlers/baseContent'

/**
 * Renders event pages dynamically using the dynamic CmsFetcher.
 */
class CmsEventHandler extends BaseEventHandler {
  protected readonly fetcher =new CmsFetcher<Event>(this.COLLECTION)
  protected readonly allFetchers = {
    page: new CmsFetcher<Page>('pages'),
    event: this.fetcher,
  }
}

const handler = new CmsEventHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}
