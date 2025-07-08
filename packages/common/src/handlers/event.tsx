import type { JSX } from 'react'
import { Event } from '@common/types/payload-types'
import { notFound } from 'next/navigation'
import { BaseContentHandler, RouteContext } from '@common/handlers/baseContent'
import { EventDetails } from '../components/EventDetails'
import { SUPPORTED_LANGUAGES } from '../types/language'

export abstract class BaseEventHandler extends BaseContentHandler<Event> {
  protected readonly COLLECTION = 'events'

  protected override renderBeforeBody(context: RouteContext, event: Event): JSX.Element | null {
  const date = new Date(event.dateTime)

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const formattedDate = Object.fromEntries(
    SUPPORTED_LANGUAGES.map(language => [
      language,
      new Intl.DateTimeFormat(language, dateFormatOptions).format(date),
    ])
  )

  const formattedTime = Object.fromEntries(
    SUPPORTED_LANGUAGES.map(language => [
      language,
      new Intl.DateTimeFormat(language, timeFormatOptions).format(date),
    ])
  )

    return <EventDetails
      heading={event.pageTitle}
      date={formattedDate}
      time={formattedTime}
      location={event.location}
      media={event.media}
    />
  }

  async render(context: RouteContext): Promise<JSX.Element> {
    const event = await this.fetcher.get((await context.params).slug)

    if (!event) notFound()
    
    return super.render(context)
  }
}
