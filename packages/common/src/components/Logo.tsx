'use client'

import { Media } from './Media'
import { useLanguage } from '../hooks/useLanguage'
import { getLocalizedValue } from '../lib/translation'
import { LocalizedMedia } from '../types/language'
import clsx from 'clsx'
import classes from './Logo.module.scss'
import { Anchor } from '@mantine/core'
import NextLink from 'next/link'

type LogoProps = {
  media: LocalizedMedia
  link?: string
  height?: number
  width?: number
}

export function Logo({ media, link = '/', height = 40, width }: LogoProps) {
  const [language] = useLanguage()
  const localMedia = getLocalizedValue(media, language)

  if (typeof localMedia !== 'object' || localMedia === null || !('url' in localMedia)) {
    return null;
  }

  const styles: React.CSSProperties = {
    height,
    width: width ?? 'auto',
  }

  return (
    <Anchor 
      component={NextLink} 
      href={link} 
      className={clsx(classes.link)}
      style={styles}
    >
      <Media
        url={localMedia.url ?? ''}
        alt={getLocalizedValue(media.altText, language) ?? ''}
        radius={false}
        className={clsx(classes.media)}
      />
    </Anchor>
  )
}
