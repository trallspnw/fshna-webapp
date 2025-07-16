import { JSX } from 'react'
import { Accordion as AccordionType } from '@common/types/payload-types'
import { Accordion } from '../../components/Accordion'
import { Fetchers } from '../../fetchers/fetcher'
import { renderBlocks } from '../../lib/blockUtil'

export function render(block: AccordionType, index: number, fetchers: Fetchers): JSX.Element {
  const renderedItems = (block.items || []).map((item) => ({
    title: item.title,
    content: renderBlocks(item.content ?? [], fetchers),
  }))

  return (
    <Accordion
      key={index}
      items={renderedItems}
    />
  )
}
