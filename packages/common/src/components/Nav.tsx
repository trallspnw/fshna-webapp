'use client'

import { Burger, Container, Group, Anchor, Button, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getLocalizedValue } from '@common/lib/translation'
import { useLanguage } from '../hooks/useLanguage'
import { usePathname } from 'next/navigation'
import { LanguageSelector } from './LanguageSelector'
import { NavItem } from '@common/types/nav'
import classes from './Nav.module.scss'
import clsx from 'clsx'
import NextLink from 'next/link'
import { IconTrees } from '@tabler/icons-react'

export type NavProps = {
  pages: NavItem[]
}

export function Nav({ pages }: NavProps) {
  const [language] = useLanguage()
  const pathname = usePathname()
  const [opened, { toggle }] = useDisclosure(false)

  const links = pages.map(({ href, label }, index) => (
    <Button 
      key={index}
      component='a'
      href={href}
      variant='subtle'
      className={clsx(
        classes.link,
        {
          [classes.active]: pathname === href,
        },
      )}
    >
      {getLocalizedValue(label, language)}
    </Button>
  ))

  return (
    <header className={classes.nav}>
      <Container size="xl" className={classes.inner}>
        <Anchor component={NextLink} href="/" className={classes.link}>
          <Group gap="xs">
            <IconTrees size={20} />
            <Text fw={600} size="md">Seminary Hill</Text>
          </Group>
        </Anchor>

        <Group className={classes.inner_right} gap="sm">
          <Group gap={5} visibleFrom="xs">
            {links}
          </Group>

          <LanguageSelector />

          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </Container>
    </header>
  )
}
