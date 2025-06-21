import { BasePageHandler, RouteContext } from '@common/handlers/page'
import { CmsPageFetcher } from '@cms/lib/cmsPageFetcher'

class CmsPageHandler extends BasePageHandler {
  protected fetcher = new CmsPageFetcher()
}

const handler = new CmsPageHandler()

export default async function Page(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
    return handler.generateMetadata(context)
}
