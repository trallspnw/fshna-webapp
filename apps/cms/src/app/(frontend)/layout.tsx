import { render as renderCommon } from '@common/layouts/layout'

/**
 * Next.js layout component. Delegate to common layout.
 */
export default function render({ children }: { children: React.ReactNode }) {
  return renderCommon({ children })
}
