import { BaseNotFoundHandler } from '@common/handlers/not-found'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Page } from '@common/types/payload-types'

class CmsNotFoundHandler extends BaseNotFoundHandler {
  protected readonly fetcher = new CmsFetcher<Page>(this.COLLECTION)
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
