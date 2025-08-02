'use client'

import { Image } from '@mantine/core';
import clsx from 'clsx'
import { rewriteMediaUrl } from '@common/lib/mediaUtil'
import classes from './Media.module.scss'
import { LocalizedMedia } from '../types/language';
import { getLocalizedValue } from '../lib/translation';
import { useLanguage } from '../hooks/useLanguage';

export type MediaProps = {
  media: LocalizedMedia
  radius?: boolean
  className?: string
}

/**
 * Media component for localized media.
 */
export function Media({ media, radius = true, className }: MediaProps) {
  const [language] = useLanguage();
  const resolvedMedia = getLocalizedValue(media, language)
  
  return (
    <Image
      src={rewriteMediaUrl(resolvedMedia!.url)}
      alt={resolvedMedia?.alt}
      radius={radius === true ? 'md' : ''}
      className={clsx(classes.image, className)}
    />
  )
}
