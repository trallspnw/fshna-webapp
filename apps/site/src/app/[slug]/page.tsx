import { BasePageHandler, RouteContext } from '@common/handlers/page'
import { SitePageFetcher } from '@site/lib/sitePageFetcher'

class SitePageHandler extends BasePageHandler {
  protected readonly fetcher = new SitePageFetcher()

  async generateStaticParams() {
    const pages = await this.fetcher.getAll()
    return pages.map((page) => ({ slug: page.slug }))
  }
}

const handler = new SitePageHandler()

export default async function Page(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}

export async function generateStaticParams() {
  return handler.generateStaticParams()
}
