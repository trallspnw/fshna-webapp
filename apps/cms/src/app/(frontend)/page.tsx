import { BaseHomeHandler } from '@ui/handlers/home'
import { CmsPageFetcher } from '@cms/lib/CmsPageFetcher'

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
