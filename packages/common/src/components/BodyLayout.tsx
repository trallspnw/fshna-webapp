'use client'

import { createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core"
import { Nav } from "./Nav"
import { NavItem } from "@common/types/nav"
import classes from './BodyLayout.module.scss'
import clsx from "clsx"
import { Footer } from "./Footer"

// TODO - placeholder theme - this should be pulled from payload globals
const forestGreen: MantineColorsTuple = [
  '#e6f1ea',
  '#c8ddcd',
  '#a7c9b0',
  '#83b591',
  '#64a279',
  '#4e9369',
  '#408b5f', // primary shade
  '#367b53',
  '#2f6d49',
  '#235b3b',
]

const cedarBark: MantineColorsTuple = [
  '#fef3e6',
  '#fce0c3',
  '#facc9c',
  '#f8b671',
  '#f6a24d',
  '#f59433',
  '#f58824', // secondary shade
  '#db751b',
  '#bf6515',
  '#a3530f',
]

export const theme = createTheme({
  primaryColor: 'forest',
  colors: {
    forest: forestGreen,
    cedar: cedarBark,
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
  hero?: React.ReactNode
  navItems: NavItem[]
  children: React.ReactNode
}

export function BodyLayout({ hero, navItems, children }: BodyLayoutProps) {
  return (
    <body className={clsx(classes.body)}>
      <MantineProvider
        theme={theme}
      >
        <div className={clsx(classes.bodyInner)}>
          {hero && hero}
          <Nav pages={navItems}/>
          <main className={clsx(classes.main)}>
            {children}
          </main>

          {/* TODO - Placeholder footer */}
          <Footer
            description="Connect with nature."
            linkGroups={[
              {
                title: 'Explore',
                links: [
                  { href: '/visit', label: { en: 'Visit', es: 'Visitar' } },
                  { href: '/map', label: { en: 'Map', es: 'Mapa' } },
                  { href: '/events', label: { en: 'Events', es: 'Eventos' } },
                ],
              },
              {
                title: 'Explore',
                links: [
                  { href: '/visit', label: { en: 'Visit', es: 'Visitar' } },
                  { href: '/map', label: { en: 'Map', es: 'Mapa' } },
                  { href: '/events', label: { en: 'Events', es: 'Eventos' } },
                ],
              },
              {
                title: 'Explore',
                links: [
                  { href: '/visit', label: { en: 'Visit', es: 'Visitar' } },
                  { href: '/map', label: { en: 'Map', es: 'Mapa' } },
                  { href: '/events', label: { en: 'Events', es: 'Eventos' } },
                ],
              },
            ]}
            socialLinks={{
              facebook: 'https://facebook.com/fshna',
              instagram: 'https://instagram.com/fshna',
              x: 'https://x.com/fshna',
              youtube: '',
              bluesky: '',
            }}
          />
        </div>
      </MantineProvider>
    </body>
  )
}
