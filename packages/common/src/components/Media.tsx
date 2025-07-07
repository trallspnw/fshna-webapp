'use client'

import { Image } from '@mantine/core';
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
    <Image
      src={rewriteMediaUrl(url)}
      alt={alt}
      radius='md'
      className={clsx(classes.image, className)}
    />
  )
}
