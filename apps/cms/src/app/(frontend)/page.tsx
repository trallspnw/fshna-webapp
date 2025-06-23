import { BaseHomeHandler } from '@common/handlers/home'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Page } from '@common/types/payload-types'

class CmsHomeHandler extends BaseHomeHandler {
  protected readonly fetcher = new CmsFetcher<Page>(this.COLLECTION)
}

const handler = new CmsHomeHandler()

// Prevents missing secret key errors
export const dynamic = 'force-dynamic'

export default async function render() {
  return handler.render()
}

export async function generateMetadata() {
  return handler.generateMetadata()
}
