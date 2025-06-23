import { BasePageHandler, RouteContext } from '@common/handlers/page'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Page } from '@common/types/payload-types'

class CmsPageHandler extends BasePageHandler {
  protected fetcher = new CmsFetcher<Page>(this.COLLECTION)
}

const handler = new CmsPageHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
    return handler.generateMetadata(context)
}
