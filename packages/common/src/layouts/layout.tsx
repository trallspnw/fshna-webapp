import '@common/styles/globals.scss'

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
      <body>{children}</body>
    </html>
  )
}
