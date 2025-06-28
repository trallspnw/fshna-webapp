'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedMedia } from '@common/types/language'
import Image from 'next/image'
import clsx from 'clsx'

const app = process.env.APP_ENV;

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

// todo - this isn't working properly on site/browser
function rewriteMediaUrl(url: string) {
  if (app === 'site') {
    return url.replace(/^\/api\/media\/file/, '/media')
  }
  return url
}
