'use client'

import { createTheme, MantineProvider } from "@mantine/core"
import { Nav } from "./Nav"
import { NavItem } from "@common/types/nav";

const theme = createTheme({
  // TODO - pull from globals
});

export type BodyLayoutProps = {
  hero?: React.ReactNode
  navItems: NavItem[]
  children: React.ReactNode
}

export function BodyLayout({ hero, navItems, children }: BodyLayoutProps) {
  return (
    <body>
      <MantineProvider
        theme={theme}
      >
        {hero && hero}
        <Nav pages={navItems}/>
        {children}
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
      </MantineProvider>
    </body>
  )
}
