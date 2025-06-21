import { BaseHomeHandler } from '@common/handlers/home'
import { CmsPageFetcher } from '@cms/lib/cmsPageFetcher'

class CmsHomeHandler extends BaseHomeHandler {
  protected readonly fetcher = new CmsPageFetcher()
}

const handler = new CmsHomeHandler()

// Prevents missing secret key errors
export const dynamic = 'force-dynamic'

export default async function Page() {
  return handler.render()
}

export async function generateMetadata() {
  return handler.generateMetadata()
}
