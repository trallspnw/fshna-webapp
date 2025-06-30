'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedMedia } from '@common/types/language'
import Image from 'next/image'
import clsx from 'clsx'
import { rewriteMediaUrl } from '@common/lib/mediaUtil'

type MediaProps = {
  media: LocalizedMedia
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export function Media({ media, className, fill, width, height, priority }: MediaProps) {
  const [language] = useLanguage()

  const mediaForLanguage = getLocalizedValue(media, language)
  const imageUrl = typeof mediaForLanguage === 'object' ? mediaForLanguage?.url ?? '' : ''

  return (
    <Image
      src={rewriteMediaUrl(imageUrl)}
      alt={getLocalizedValue(mediaForLanguage?.alt, language) || ''}
      className={clsx('media', className)}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      unoptimized
    />
  )
}
