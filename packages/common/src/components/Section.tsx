'use client'

import { JSX } from "react"
import { LocalizedMedia, LocalizedText } from "../types/language"
import { useLanguage } from "../hooks/useLanguage"
import { Title } from "@mantine/core"
import { getLocalizedValue } from "../lib/translation"
import { Media } from "./Media"

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
    <section>
      <Title order={2}>{getLocalizedValue(title, language)}</Title>
      
      {children}
    
      {url && (
        <Media 
          url={url}
          alt={altText}
        />
      )}
    </section>
  )
}
