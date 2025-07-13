'use client'

import { Burger, Container, Group, Button, Drawer, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getLocalizedValue } from '@common/lib/translation'
import { useLanguage } from '../hooks/useLanguage'
import { usePathname } from 'next/navigation'
import { LanguageSelector } from './LanguageSelector'
import { NavItem } from '@common/types/nav'
import classes from './Nav.module.scss'
import clsx from 'clsx'
import { LocalizedMedia } from '../types/language'
import { Logo } from './Logo'

export type NavProps = {
  logo?: LocalizedMedia
  pages: NavItem[]
}

export function Nav({ logo, pages }: NavProps) {
  const [language] = useLanguage()
  const pathname = usePathname()
  const [opened, { close, toggle }] = useDisclosure(false)

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
    <>
      <header className={classes.nav}>
        <Container size="xl" className={classes.inner}>
          {logo && <Logo 
            media={logo} 
          />}

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

      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="xs"
        position="right"
        hiddenFrom="xs"
      >
        <Stack>
          {links}
        </Stack>
      </Drawer>
    </>
  )
}
