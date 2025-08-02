import { BaseNotFoundHandler } from '@common/handlers/not-found'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Page } from '@common/types/payload-types'

/**
 * Renders the 404 page dynamically using the dynamic CmsFetcher.
 */
class CmsNotFoundHandler extends BaseNotFoundHandler {
  protected readonly fetcher = new CmsFetcher<Page>(this.COLLECTION)
  protected readonly allFetchers = {
    page: this.fetcher,
    event: new CmsFetcher<Event>('events'),
  }
}

const handler = new CmsNotFoundHandler()

// Prevents missing secret key errors
export const dynamic = 'force-dynamic'

export default async function render() {
  return handler.render()
}

export async function generateMetadata() {
  return handler.generateMetadata()
}
