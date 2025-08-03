import '@mantine/core/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { languageStore } from '@common/lib/languageStore'

type LayoutProps = {
  children: React.ReactNode,
}

/**
 * Top level shared website layout component.
 */
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
