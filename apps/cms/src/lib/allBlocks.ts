import { Accordion } from "../blocks/Accordion";
import { Align } from "../blocks/Align";
import { TwoColumns } from "../blocks/TwoColumns";
import { commonBlocks } from "./commonBlocks";

/**
 * All standard blocks which can be used on pages and events. Includes base/common blocks and layout blocks.
 */
export const allBlocks = [
  ...commonBlocks,
  TwoColumns,
  Align,
  Accordion,
]