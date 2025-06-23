import { BaseEventHandler, RouteContext } from '@common/handlers/event'
import { SiteFetcher } from '@site/lib/siteFetcher'
import { Event } from '@common/types/payload-types'

class SiteEventHandler extends BaseEventHandler {
  protected readonly fetcher = new SiteFetcher<Event>(this.COLLECTION)

  async generateStaticParams() {
    const events = await this.fetcher.getAll()
    return events.map((event) => ({ slug: event.slug }))
  }
}

const handler = new SiteEventHandler()

export default async function render(context: RouteContext) {
  return handler.render(context)
}

export async function generateMetadata(context: RouteContext) {
  return handler.generateMetadata(context)
}

export async function generateStaticParams() {
  return handler.generateStaticParams()
}
