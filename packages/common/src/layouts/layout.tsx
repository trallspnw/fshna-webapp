import '@common/styles/globals.scss'
import { languageStore } from '@common/lib/languageStore'
import { LanguageSelector } from '@common/components/LanguageSelector'

type LayoutProps = {
  children: React.ReactNode,
}

export function render({ children }: LayoutProps) {
  return (
    <html lang={languageStore.getSnapshot()}>
      <body>
        <LanguageSelector />
        {children}
      </body>
    </html>
  )
}
