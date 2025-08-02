import { JSX } from 'react'
import { Accordion as AccordionType, General } from '@common/types/payload-types'
import { Accordion } from '../../components/Accordion'
import { Fetchers } from '../../fetchers/fetcher'
import { renderBlocks } from '../../lib/blockUtil'

/**
 * Handles rendering of accordion blocks.
 */
export function render(block: AccordionType, index: number, fetchers: Fetchers, generalGlobals: General): JSX.Element {
  const renderedItems = (block.items || []).map((item) => ({
    title: item.title,
    content: renderBlocks(item.content ?? [], fetchers, generalGlobals),
  }))

  return (
    <Accordion
      key={index}
      items={renderedItems}
    />
  )
}
