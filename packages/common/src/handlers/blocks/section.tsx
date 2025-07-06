import { JSX } from "react";
import { Section as SectionType } from '@common/types/payload-types'
import { Section } from "../../components/Section";
import { renderBlocks } from "../../lib/blockUtil";

export function render(block: SectionType, index: number): JSX.Element {
  return (
    <Section 
      key={index}
      title={block.heading} 
      media={block.media}
    >
      <>
        {renderBlocks(block.blocks)}
      </>
    </Section>
  )
}
