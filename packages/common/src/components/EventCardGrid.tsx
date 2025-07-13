'use client'

import { useState } from 'react'
import { Button, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { EventCard } from './EventCard'
import classes from './EventCardGrid.module.scss'
import { DEFAULT_LANGUAGE, LocalizedMedia, LocalizedText } from '../types/language'
import { useLanguage } from '../hooks/useLanguage'
import { getLocalizedValue } from '../lib/translation'
import { Media } from '../types/payload-types'
import clsx from 'clsx'
import { LinkButton, LinkButtonProps } from './LinkButton'

type EventDetails = {
  name: LocalizedText
  href: string
  imageSrc: LocalizedMedia 
  dateTime: Date
}

type EventCardGridProps = {
  heading: LocalizedText
  events: EventDetails[]
  rows: number
  showMoreLabel?: LocalizedText
  link?: LinkButtonProps
}

export function EventCardGrid({ heading, events, rows, showMoreLabel, link }: EventCardGridProps) {
  const [language] = useLanguage()
  
  const isLg = useMediaQuery('(min-width: 1200px)')
  const isMd = useMediaQuery('(min-width: 900px)')

  const desiredColumns = isLg ? 4 : isMd ? 3 : 2
  const columns = Math.min(desiredColumns, events.length)
  const [visibleRows, setVisibleRows] = useState(rows)
  const visibleCount = visibleRows * columns

  const visibleEvents = events.slice(0, visibleCount)
  const allEventsVisible = visibleCount >= events.length
  const renderShowMore = showMoreLabel && showMoreLabel[DEFAULT_LANGUAGE] && !allEventsVisible
  const renderButtons = renderShowMore || link

  return (
    <>
      <Title order={2} className={clsx(classes.title)}>
        {getLocalizedValue(heading, language)}
      </Title>
      <div className={classes.wrapper}>
        <div
          className={classes.grid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {visibleEvents.map((event, index) => (
            <EventCard
              key={index}
              name={getLocalizedValue(event.name, language) || ''}
              href={event.href}
              imageSrc={(getLocalizedValue(event.imageSrc, language) as Media)?.url ?? ''}
              date={event.dateTime}
              locale={language}
            />
          ))}
        </div>

        {renderButtons && (
          <div className={classes.buttonContainer}>
            {renderShowMore && (
              <Button 
              variant='subtle'
              onClick={() => setVisibleRows((r) => r + 2)}
            >
              {getLocalizedValue(showMoreLabel, language)}
            </Button>
            )}
            {link && (
              <LinkButton variant='subtle' {...link}/>
            )}
          </div>
        )}
      </div>
    </>
  )
}
