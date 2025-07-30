'use client'

import { Button, createTheme, MantineColorsTuple, MantineProvider, Modal } from "@mantine/core"
import { Nav } from "./Nav"
import { NavItem } from "@common/types/nav"
import classes from './BodyLayout.module.scss'
import clsx from "clsx"
import { Footer, FooterProps } from "./Footer"
import { LocalizedMedia } from "../types/language"
import { useEffect } from "react"
import { useDisclosure } from "@mantine/hooks"

// TODO - move theme to configuration before launch
const primaryColor: MantineColorsTuple = [
  '#e6f1ea',
  '#c8ddcd',
  '#a7c9b0',
  '#83b591',
  '#64a279',
  '#4e9369',
  '#408b5f', // main
  '#367b53',
  '#2f6d49',
  '#235b3b',
]

export const theme = createTheme({
  primaryColor: 'primaryColor',
  colors: {
    primaryColor: primaryColor,
  },
  fontFamily: 'system-ui, sans-serif',
  headings: {
    fontFamily: 'system-ui, sans-serif',
    sizes: {
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2rem' },
      h3: { fontSize: '1.75rem' },
    },
  },
})

export type BodyLayoutProps = {
  logo?: LocalizedMedia
  hero?: React.ReactNode
  navItems: NavItem[]
  children: React.ReactNode
  footer: FooterProps
}

export function BodyLayout({ logo, hero, navItems, children, footer }: BodyLayoutProps) {
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) sessionStorage.setItem('ref', ref)
  }, [])

  useEffect(() => {
    const acknowledged = sessionStorage.getItem('disclaimerAcknowledged')
    if (!acknowledged) {
      open()
    }
  }, [open])

  const handleAcknowledge = () => {
    sessionStorage.setItem('disclaimerAcknowledged', 'true')
    close()
  }

  return (
    <body className={clsx(classes.body)}>
      <MantineProvider
        theme={theme}
      >
        <div className={clsx(classes.bodyInner)}>
          {hero && hero}
          <Nav logo={logo} pages={navItems}/>
          <main className={clsx(classes.main)}>
            {children}
          </main>
          <Footer {...footer}/>
        </div>
        <Modal
          opened={opened}
          onClose={handleAcknowledge}
          title="Heads up!"
          centered
          withCloseButton={false}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <p>This page is in development. Content is placeholder only.</p>
          <Button fullWidth mt="md" onClick={handleAcknowledge}>
            Got it
          </Button>
        </Modal>
      </MantineProvider>
    </body>
  )
}



