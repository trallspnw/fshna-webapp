import { Hero } from "@common/types/payload-types";
import { render as renderHero } from '@common/handlers/blocks/hero'

export type BlockTypeMap = {
  hero: Hero
}

export const blockRenderers = {
  hero: renderHero,
}

export type BaseBlock = BlockTypeMap[keyof BlockTypeMap]
