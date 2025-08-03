import { EventCardGrid as EventCardGridType } from '@common/types/payload-types'
import { Fetcher, Fetchers } from '@common/fetchers/fetcher'
import { Event } from '@common/types/payload-types'
import { EventCardGrid } from '@common/components/EventCardGrid'
import { JSX } from 'react'
import { normalizeMedia } from '../../lib/mediaUtil'

/**
 * Handles rendering of event card grid blocks.
 */
export async function render(block: EventCardGridType, index: number, fetchers: Fetchers): Promise<JSX.Element> {
  const eventFetcher = fetchers.event as Fetcher<Event>
  const allEvents = await eventFetcher.getAll()

  // Seminary HIll events are always Pacific Time - This can be made configuratble in the future.
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))

  const filtered = allEvents.filter(event =>
    block.filter === 'upcoming'
      ? new Date(event.dateTime) >= now
      : new Date(event.dateTime) < now
  )

  const sorted = filtered.sort((a, b) =>
    block.filter === 'upcoming'
      ? a.dateTime.localeCompare(b.dateTime)
      : b.dateTime.localeCompare(a.dateTime)
  )

  const eventDetails = sorted.map(event => ({
    name: event.title,
    href: `/events/${event.slug}`,
    media: normalizeMedia(event.media),
    dateTime: new Date(event.dateTime),
  }))

  if (eventDetails.length === 0) return <></>

  return (
    <EventCardGrid
      heading={block.heading}
      events={eventDetails}
      rows={block.rowsToShow}
      showMoreLabel={block.showMoreLabel}
    />
  )
}
