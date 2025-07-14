import { Align } from '@common/types/payload-types'
import { renderBlocks } from '../../lib/blockUtil'
import { Flex } from '@mantine/core'
import type { JSX } from 'react'
import { Fetchers } from '../../fetchers/fetcher'

export function render(block: Align, index: number, fetchers: Fetchers): JSX.Element {
  const justifyMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  } as const

  return (
    <Flex
      key={index}
      justify={justifyMap[block.align] ?? 'flex-start'}
      w='100%'
      mb='lg'
    >
      {renderBlocks(block.blocks ?? [], fetchers)}
    </Flex>
  )
}
