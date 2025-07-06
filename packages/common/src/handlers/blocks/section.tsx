import { JSX } from "react";
import { Section as SectionType } from '@common/types/payload-types'
import { normalizeLocalization } from "../../lib/translation";
import { Section } from "../../components/Section";
import { renderBlocks } from "../../lib/blockUtil";

export function render(block: SectionType, index: number): JSX.Element {
  console.log(`BLOCKS:  ${JSON.stringify(block.blocks)}`)
  return (
    <Section 
      key={index}
      title={block.heading} 
      media={normalizeLocalization(block.media)}
    >
      <>
        {/* TODO - Paragraphs are not rendering */}
        {renderBlocks(block.blocks)}
      </>
    </Section>
  )
}
