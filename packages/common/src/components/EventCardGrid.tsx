'use client'

import { useState } from 'react'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { EventCard, EventCardProps } from './EventCard'
import classes from './EventCardGrid.module.scss'

type EventCardGridProps = {
  events: EventCardProps[]
  rows: number
  showMoreLabel?: string
}

export function EventCardGrid({ events, rows, showMoreLabel }: EventCardGridProps) {
  const isLg = useMediaQuery('(min-width: 1200px)')
  const isMd = useMediaQuery('(min-width: 900px)')

  const desiredColumns = isLg ? 4 : isMd ? 3 : 2
  const columns = Math.min(desiredColumns, events.length)
  const [visibleRows, setVisibleRows] = useState(rows)
  const visibleCount = visibleRows * columns

  const visibleEvents = events.slice(0, visibleCount)
  const allEventsVisible = visibleCount >= events.length

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.grid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {visibleEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      {showMoreLabel && !allEventsVisible && (
        <div className={classes.buttonContainer}>
          <Button 
            variant='subtle'
            onClick={() => setVisibleRows((r) => r + 2)}
          >
            {showMoreLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
