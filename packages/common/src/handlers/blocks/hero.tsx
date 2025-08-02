import { Hero } from '@common/components/Hero'
import { JSX } from 'react'
import { Hero as HeroType } from '@common/types/payload-types'
import { normalizeMedia } from '../../lib/mediaUtil'

/**
 * Handles rendering of hero blocks.
 */
export function render(block: HeroType, index: number): JSX.Element {

  return (
    <Hero
      key={index}
      heading={block.heading}
      subheading={block.subheading}
      media={normalizeMedia(block.backgroundMedia)}
      actions={block.actions ?? []}
    />
  )
}
