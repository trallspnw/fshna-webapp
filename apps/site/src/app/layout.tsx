import { render as renderCommon, baseMetadata } from '@common/layouts/layout'

export const metadata = baseMetadata

export default function render({ children }: { children: React.ReactNode }) {
  return renderCommon({ children })
}
