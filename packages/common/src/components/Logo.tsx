'use client'

import { Media } from './Media'
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
  className?: string
}

export function Logo({ media, link = '/', height = 40, width, className }: LogoProps) {
  const styles: React.CSSProperties = {
    height,
    width: width ?? 'auto',
  }

  return (
    <Anchor 
      component={NextLink} 
      href={link} 
      className={clsx(classes.link, className)}
      style={styles}
    >
      <Media
        media={media}
        radius={false}
        className={clsx(classes.media)}
      />
    </Anchor>
  )
}
