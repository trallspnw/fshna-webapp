'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { rewriteMediaUrl } from '@common/lib/mediaUtil'
import classes from './Media.module.scss'

export type MediaProps = {
  url: string
  alt: string
  className?: string
}

export function Media({ url, alt, className }: MediaProps) {
  return (
    <div className={clsx(classes.container, className)}>
      <Image
        src={rewriteMediaUrl(url)}
        alt={alt}
        className={clsx(classes.image, className)}
        fill={true}
        unoptimized
      />
    </div>
  )
}
