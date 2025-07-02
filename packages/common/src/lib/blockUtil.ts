import { Hero } from "@common/types/payload-types";
import { render as renderHero } from '@common/handlers/blocks/hero'
import { JSX } from "react";

export type BlockTypeMap = {
  hero: Hero
}

export const blockRenderers = {
  hero: renderHero,
}

export type BaseBlock = BlockTypeMap[keyof BlockTypeMap]

export function renderBlocks(blocks?: BaseBlock[] | null): JSX.Element[] {
  return (
    blocks?.map((block, index) => {
      const render = blockRenderers[block.blockType]
      return render ? render(block, index) : null
    })
    .filter(Boolean) as JSX.Element[]
  )
}