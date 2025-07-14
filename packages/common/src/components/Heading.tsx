'use client'

import { Title } from '@mantine/core'
import { useLanguage } from '../hooks/useLanguage'
import { LocalizedText } from '../types/language'
import { getLocalizedValue } from '../lib/translation'
import classes from './Heading.module.scss'
import clsx from 'clsx'

type HeadingProps = {
  text: LocalizedText
  level?: string
}

export function Heading({ text, level = '2' }: HeadingProps) {
  const [language] = useLanguage()
  const order = parseInt(level) as 1 | 2 | 3 | 4 | 5 | 6

  return (
    <Title
      order={order}
      className={clsx(classes.heading)}
    >
      {getLocalizedValue(text, language)}
    </Title>
  )
}
