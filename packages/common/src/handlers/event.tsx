import type { JSX } from 'react'
import { Event, General } from '@common/types/payload-types'
import { notFound } from 'next/navigation'
import { BaseContentHandler, RouteContext } from '@common/handlers/baseContent'
import { EventDetails } from '../components/EventDetails'
import { SUPPORTED_LANGUAGES } from '../types/language'
import { normalizeMedia } from '../lib/mediaUtil'

/**
 * Handles content rendering for the events collection.
 */
export abstract class BaseEventHandler extends BaseContentHandler<Event> {
  protected readonly COLLECTION = 'events'

  /**
   * Overrides the render before body to render an event hearder.
   */
  protected override renderBeforeBody(context: RouteContext, event: Event, general: General): JSX.Element | null {
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
      heading={event.title}
      date={formattedDate}
      time={formattedTime}
      location={event.location}
      media={normalizeMedia(event.media)}
      dateLabel={general.eventLabels?.dateLabel}
      timeLabel={general.eventLabels?.timeLabel}
      locationLabel={general.eventLabels?.locationLabel}
    />
  }

  async render(context: RouteContext): Promise<JSX.Element> {
    const event = await this.fetcher.get((await context.params).slug)

    if (!event) notFound()
    
    return super.render(context)
  }
}
