import { Hero } from '@common/components/Hero'
import { JSX } from 'react'
import { Hero as HeroType } from '@common/types/payload-types'
import { LocalizedMedia } from '@common/types/language'

export function render(block: HeroType, index: number): JSX.Element {
  const backgroundMedia = typeof block.backgroundMedia === 'object' && block.backgroundMedia !== null
    ? block.backgroundMedia as LocalizedMedia
    : undefined

  return (
    <Hero
      key={index}
      heading={block.heading}
      subheading={block.subheading}
      media={backgroundMedia!}
      ctas={block.ctas?.map(cta => ({
        label: cta.label,
        href: cta.url,
      })) ?? []}
    />
  )
}
