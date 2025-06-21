import { BaseHomeHandler } from '@common/handlers/home'
import { SitePageFetcher } from '@site/lib/sitePageFetcher'

class SiteHomeHandler extends BaseHomeHandler {
  protected readonly fetcher = new SitePageFetcher()
}

const handler = new SiteHomeHandler()

export default async function Page() {
  return handler.render()
}

export async function generateMetadata() {
  return handler.generateMetadata()
}
