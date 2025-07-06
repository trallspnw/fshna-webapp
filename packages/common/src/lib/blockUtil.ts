import { Hero, Section, Paragraph } from "@common/types/payload-types";
import { render as renderHero } from '@common/handlers/blocks/hero'
import { render as renderSection } from '@common/handlers/blocks/section'
import { render as renderParagraph } from '@common/handlers/blocks/paragraph'
import { JSX } from "react";

export const blockRegistry = {
  hero: {
    render: renderHero,
    type: {} as Hero,
  },
  paragraph: {
    render: renderParagraph,
    type: {} as Paragraph,
  },
  section: {
    render: renderSection,
    type: {} as Section,
  },
}

export type BlockType = keyof typeof blockRegistry

export type BlockRegistry = typeof blockRegistry

export type BlockMap = {
  [K in BlockType]: BlockRegistry[K]['type'] & { blockType: K }
}

export type BaseBlock = BlockMap[BlockType]

export function renderBlocks(blocks?: BaseBlock[] | null): JSX.Element[] {
  return (
    blocks?.map((block, index) => {
      const blockType = block.blockType

      // Narrow the block type correctly
      const render = blockRegistry[blockType].render as (
        block: Extract<BaseBlock, { blockType: typeof blockType }>,
        index: number
      ) => JSX.Element

      return render(block, index)
    })?.filter(Boolean) ?? []
  )
}
