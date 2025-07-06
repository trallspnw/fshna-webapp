import { JSX } from "react";
import { Paragraph } from '@common/types/payload-types'
import { normalizeLocalization } from "../../lib/translation";
import { Text } from "@common/components/Text"

export function render(block: Paragraph, index: number): JSX.Element {
  return (
    <Text
      key={index}
      text={normalizeLocalization(block.text)}
    />
  )
}
