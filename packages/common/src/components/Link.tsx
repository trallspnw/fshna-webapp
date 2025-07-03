'use client'

import { Anchor } from '@mantine/core'
import NextLink from 'next/link'

type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export function Link({ href, children, className }: LinkProps) {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <Anchor
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Anchor>
    )
  }

  return (
    <Anchor
      component={NextLink}
      href={href}
      className={className}
    >
      {children}
    </Anchor>
  )
}
