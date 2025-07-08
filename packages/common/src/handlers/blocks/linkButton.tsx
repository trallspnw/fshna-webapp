import { JSX } from "react";
import { LinkButton } from "../../components/LinkButton";
import { LinkButton as LinkButtonType } from '@common/types/payload-types' 

export function render(block: LinkButtonType, index: number): JSX.Element {
  return (
    <LinkButton
      key={index}
      label={block.label}
      href={block.url}
    />
  )
}
