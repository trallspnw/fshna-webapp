import '@mantine/core/styles.css';
import '@common/styles/globals.scss'

import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from '@mantine/core';
import { languageStore } from '@common/lib/languageStore'
import { LanguageSelector } from '@common/components/LanguageSelector'

type LayoutProps = {
  children: React.ReactNode,
}

const theme = createTheme({
  // TODO - pull from globals
});

export function render({ children }: LayoutProps) {
  return (
    <html lang={languageStore.getSnapshot()} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={theme}
        >
          {children}
        </MantineProvider>
        <LanguageSelector />
      </body>
    </html>
  )
}
