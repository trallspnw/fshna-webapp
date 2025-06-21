import { renderRootLayout, baseMetadata } from '@ui/layouts/layout'

export const metadata = baseMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return renderRootLayout({ children })
}
