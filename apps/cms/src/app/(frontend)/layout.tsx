import { render as renderCommon } from '@common/layouts/layout'

export default function render({ children }: { children: React.ReactNode }) {
  return renderCommon({ children })
}
