'use client'

import { LocalizedMedia, LocalizedText } from "../types/language"
import { useLanguage } from "../hooks/useLanguage"
import { getLocalizedValue } from "../lib/translation"
import clsx from "clsx"
import classes from './EventDetails.module.scss'
import { Section } from "./Section"

type EventDetailsProps = {
  heading: LocalizedText
  date: LocalizedText
  time: LocalizedText
  location: LocalizedText
  media: LocalizedMedia
}

export function EventDetails(props: EventDetailsProps) {
  const [language] = useLanguage()

  // TODO - Translate list labels
  return (
    <>
      <Section
        title={props.heading}
        media={props.media}
      >
        <ul>
          <li>
            <span className={clsx(classes.listLabel)}>Date: </span>
            {getLocalizedValue(props.date, language)}
          </li>
          <li>
            <span className={clsx(classes.listLabel)}>Time: </span>
            {getLocalizedValue(props.time, language)}
          </li>
          <li>
            <span className={clsx(classes.listLabel)}>Location: </span>
            {getLocalizedValue(props.location, language)}
          </li>
        </ul>
      </Section>
    </>
  )
}