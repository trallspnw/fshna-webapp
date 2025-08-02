import { BasePageHandler } from '@common/handlers/page'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Page } from '@common/types/payload-types'
import { RouteContext } from '@common/handlers/baseContent'

/**
 * Renders pages dynamically using the dynamic CmsFetcher.
 */
class CmsPageHandler extends BasePageHandler {
  protected fetcher = new CmsFetcher<Page>(this.COLLECTION)
  protected readonly allFetchers = {
    page: this.fetcher,
    event: new CmsFetcher<Event>('events'),
  }
}

const handler = new CmsPageHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
    return handler.generateMetadata(context)
}
