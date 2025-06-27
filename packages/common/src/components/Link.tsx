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
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  )
}
