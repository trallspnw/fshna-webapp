'use client'

import { JSX } from "react"
import { LocalizedMedia, LocalizedText } from "../types/language"
import { useLanguage } from "../hooks/useLanguage"
import { Title } from "@mantine/core"
import { getLocalizedValue } from "../lib/translation"
import { Media } from "./Media"
import clsx from "clsx"
import classes from './Section.module.scss'

export type SectionProps = {
  title: LocalizedText
  children: JSX.Element
  media?: LocalizedMedia
}

export function Section({ title, children, media }: SectionProps) {
  const [language] = useLanguage()
  const mediaValue = getLocalizedValue(media, language)
  const altText = getLocalizedValue(media?.altText, language) || ''

  const url = typeof mediaValue === 'object' && mediaValue !== null
    ? mediaValue.url ?? ''
    : ''

  return (
    <section className={clsx(classes.section)}>
      <Title order={2} className={clsx(classes.title)}>
        {getLocalizedValue(title, language)}
      </Title>
      
      <div
        className={clsx(
          classes.contentRow,
          !url && classes.noImage
        )}
      >
        <div className={classes.text}>
          {children}
        </div>

        {url && (
          <div className={classes.image}>
            <Media url={url} alt={altText} />
          </div>
        )}
      </div>
    </section>
  )
}
