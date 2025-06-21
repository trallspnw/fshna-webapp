import { BaseHomeHandler } from '@ui/handlers/home'
import { SitePageFetcher } from '@site/lib/SitePageFetcher'

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
