import { BaseEventHandler } from '@common/handlers/event'
import { CmsFetcher } from '@cms/lib/cmsFetcher'
import { Event } from '@common/types/payload-types'
import { RouteContext } from '@common/handlers/baseContent'

class CmsEventHandler extends BaseEventHandler {
  protected fetcher = new CmsFetcher<Event>(this.COLLECTION)
}

const handler = new CmsEventHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}
