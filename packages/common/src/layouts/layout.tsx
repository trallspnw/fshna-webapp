import '@mantine/core/styles.css';
import '@common/styles/globals.scss'

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { languageStore } from '@common/lib/languageStore'

type LayoutProps = {
  children: React.ReactNode,
}

export async function render({ children }: LayoutProps) {

  return (
    <html lang={languageStore.getSnapshot()} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      {children}
    </html>
  )
}
