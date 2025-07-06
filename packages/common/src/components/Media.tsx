'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedMedia } from '@common/types/language'
import Image from 'next/image'
import clsx from 'clsx'
import { rewriteMediaUrl } from '@common/lib/mediaUtil'
import classes from './Media.module.scss'

type MediaProps = {
  media: LocalizedMedia
  className?: string
}

export function Media({ media, className }: MediaProps) {
  const [language] = useLanguage()

  const mediaForLanguage = getLocalizedValue(media, language)
  const imageUrl = typeof mediaForLanguage === 'object' ? mediaForLanguage?.url ?? '' : ''

  return (
    <div className={clsx(classes.container, className)}>
      <Image
        src={rewriteMediaUrl(imageUrl)}
        alt={getLocalizedValue(mediaForLanguage?.alt, language) || ''}
        className={clsx(classes.image, className)}
        fill={true}
        unoptimized
      />
    </div>
  )
}
