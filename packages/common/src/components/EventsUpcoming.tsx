'use client'

import { Button, Title } from "@mantine/core"
import { useLanguage } from "../hooks/useLanguage"
import { LocalizedText } from "../types/language"
import clsx from "clsx"
import classes from './EventsUpcoming.module.scss'
import { getLocalizedValue } from "../lib/translation"
import { EventCardGrid } from "./EventCardGrid"
import { EventCardProps } from "./EventCard"

export type EventsUpcomingProps = {
  title: LocalizedText
  seeAllLabel: LocalizedText
  seeAllHref: string
  events: EventCardProps[]
}

export function EventsUpcoming({ title, seeAllLabel, seeAllHref, events }: EventsUpcomingProps) {
  const [language] = useLanguage()

  if (events.length === 0) return null

  return (
    <section className={clsx(classes.section)}>
      <Title order={2} className={clsx(classes.title)}>
        {getLocalizedValue(title, language)}
      </Title>
      <EventCardGrid 
        events={events}
        rows={1}
      />
      <div className={classes.buttonContainer}>
        <Button 
          variant='subtle'
          component='a'
          href={seeAllHref}
        >
          {getLocalizedValue(seeAllLabel, language)}
        </Button>
      </div>
    </section>
  )
}
