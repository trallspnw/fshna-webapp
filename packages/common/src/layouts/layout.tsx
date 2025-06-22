import '@common/styles/globals.scss'
import Logo from '../components/ui/Logo'
import { LanguageSelector } from '../components/ui/LanguageSelector'

type LayoutProps = {
  children: React.ReactNode
}

export const baseMetadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export function renderRootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Logo 
          imageUrl='https://i.postimg.cc/9QVgK103/fshna-logo.png'
          altText='Seminary Hill Natural Area Logo'
        />
        <LanguageSelector />
        {children}
        </body>
    </html>
  )
}
