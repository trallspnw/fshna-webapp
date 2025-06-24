import { Page } from '@common/types/payload-types'
import { BasePageHandler } from '@common/handlers/page'
import { SiteFetcher } from '@site/lib/siteFetcher'
import { RouteContext } from '@common/handlers/baseContent'

class SitePageHandler extends BasePageHandler {
  protected readonly fetcher = new SiteFetcher<Page>(this.COLLECTION)

  async generateStaticParams() {
    const pages = await this.fetcher.getAll()
    return pages.map((page) => ({ slug: page.slug }))
  }
}

const handler = new SitePageHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}

export async function generateStaticParams() {
  return handler.generateStaticParams()
}
