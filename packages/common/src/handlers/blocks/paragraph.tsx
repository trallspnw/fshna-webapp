import { JSX } from "react";
import { Paragraph } from "../../components/Paragraph";
import { Paragraph as ParagraphType } from '@common/types/payload-types' 

export function render(block: ParagraphType, index: number): JSX.Element {
  return (
    <Paragraph
      key={index}
      text={block.text}
    />
  )
}
