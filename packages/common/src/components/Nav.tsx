// Adapted from https://ui.mantine.dev/category/headers/

'use client'

import { Burger, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Nav.module.scss'
import { getLocalizedValue } from '../lib/translation'
import { useLanguage } from '../hooks/useLanguage'
import { usePathname } from 'next/navigation'
import { Link } from './Link'
import clsx from 'clsx'
import { LanguageSelector } from './LanguageSelector'
import { NavItem } from '../types/nav'

export type NavProps = {
  pages: NavItem[]
}

export function Nav({ pages }: NavProps) {
  const [language] = useLanguage()
  const pathname = usePathname()
  const [opened, { toggle }] = useDisclosure(false)

  const links = pages.map(({ href, label }) => (
    <Link
        key={href}
        href={href}
        className={clsx(
          classes.link,
          {
            [classes.active]: pathname === href,
          },
        )}
      >
      {getLocalizedValue(label, language)}
    </Link>
  ))

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Link href='/'>Logo</Link>
        <LanguageSelector />
        <Group gap={5} visibleFrom="xs">
          {links}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}
