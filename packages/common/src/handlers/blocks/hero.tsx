import { Hero } from '@common/components/Hero'
import { JSX } from 'react'
import { Hero as HeroType } from '@common/types/payload-types'
import { normalizeLocalization } from '@common/lib/translation'
import { LocalizedMedia } from '@common/types/language'

export function render(block: HeroType, index: number): JSX.Element {
  const backgroundMedia = typeof block.backgroundMedia === 'object' && block.backgroundMedia !== null
    ? block.backgroundMedia as LocalizedMedia
    : undefined
    
  return (
    <Hero
      key={`hero=${index}`}
      heading={normalizeLocalization(block.heading)}
      subheading={normalizeLocalization(block.subheading)}
      media={normalizeLocalization(backgroundMedia)}
      ctas={block.ctas?.map(cta => ({
        label: cta.label,
        href: cta.url,
      })) ?? []}
    />
  )
}
