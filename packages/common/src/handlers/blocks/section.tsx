import { JSX } from "react";
import { Section as SectionType } from '@common/types/payload-types'
import { Section } from "../../components/Section";
import { renderBlocks } from "../../lib/blockUtil";
import { Fetchers } from "../../fetchers/fetcher";

export function render(block: SectionType, index: number, fetchers: Fetchers): JSX.Element {
  return (
    <Section 
      key={index}
      title={block.heading} 
      media={block.media}
    >
      <>
        {block.blocks && renderBlocks(block.blocks, fetchers)}
      </>
    </Section>
  )
}
