import '@common/styles/globals.scss'
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { languageStore } from '@common/lib/languageStore'
import { LanguageSelector } from '@common/components/LanguageSelector'

type LayoutProps = {
  children: React.ReactNode,
}

export function render({ children }: LayoutProps) {
  return (
    <html lang={languageStore.getSnapshot()} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <LanguageSelector />
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
