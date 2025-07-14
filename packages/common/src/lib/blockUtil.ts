import { Hero, Paragraph, EventCardGrid, Heading, Action, MediaBlock, TwoColumns, Align } from "@common/types/payload-types";
import { render as renderAction } from '@common/handlers/blocks/action'
import { render as renderAlign } from '@common/handlers/blocks/align'
import { render as renderHeading } from '@common/handlers/blocks/heading'
import { render as renderHero } from '@common/handlers/blocks/hero'
import { render as renderMedia } from '@common/handlers/blocks/media'
import { render as renderParagraph } from '@common/handlers/blocks/paragraph'
import { render as renderEventCardGrid } from '@common/handlers/blocks/eventCardGrid'
import { render as renderTwoColumns } from '@common/handlers/blocks/twoColumns'
import { JSX } from "react";
import { Fetcher, Fetchers, FetcherTypes } from "../fetchers/fetcher";

export const blockRegistry = {
  action: {
    render: renderAction,
    type: {} as Action,
  },
  align: {
    render: renderAlign,
    type: {} as Align,
  },
  eventCardGrid: {
    render: renderEventCardGrid,
    type: {} as EventCardGrid,
  },
  heading: {
    render: renderHeading,
    type: {} as Heading,
  },
  hero: {
    render: renderHero,
    type: {} as Hero,
  },
  media: {
    render: renderMedia,
    type: {} as MediaBlock,
  },
  paragraph: {
    render: renderParagraph,
    type: {} as Paragraph,
  },
  twoColumns: {
    render: renderTwoColumns,
    type: {} as TwoColumns,
  },
}

export type BlockType = keyof typeof blockRegistry

export type BlockRegistry = typeof blockRegistry

export type BlockMap = {
  [K in BlockType]: BlockRegistry[K]['type'] & { blockType: K }
}

export type BaseBlock = BlockMap[BlockType]

export function renderBlocks(blocks: BaseBlock[], fetchers: Fetchers) : JSX.Element[] {
  return (
    blocks?.map((block, index) => {
      const blockType = block.blockType

      const render = blockRegistry[blockType].render as (
        block: Extract<BaseBlock, { blockType: typeof blockType }>,
        index: number,
        fetchers: Record<FetcherTypes, Fetcher<any>>,
      ) => JSX.Element

      return render(block, index, fetchers)
    })?.filter(Boolean) ?? []
  )
}
