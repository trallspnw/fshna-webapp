import type { JSX } from 'react'
import { Event } from '@common/types/payload-types'
import { notFound } from 'next/navigation'
import { BaseContentHandler, RouteContext } from '@common/handlers/baseContent'

export abstract class BaseEventHandler extends BaseContentHandler<Event> {
  protected readonly COLLECTION = 'events'

  async render(context: RouteContext): Promise<JSX.Element> {
    const event = await this.fetcher.get((await context.params).slug)

    if (!event) notFound()

    return super.render(context)
  }
}
