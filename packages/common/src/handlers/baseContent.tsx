import type { Metadata } from 'next'
import type { Fetcher } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { textFromBlock } from '@common/handlers/blocks/text'
import { notFound } from 'next/navigation'
import { TextBlock } from '@common/types/payload-types'

export type BlockTypeMap = {
  'text-block': TextBlock
}

export type BaseBlock = BlockTypeMap[keyof BlockTypeMap]

const blockRenderers: Record<string, (block: BaseBlock) => JSX.Element> = {
  'text-block': textFromBlock,
}

export type RouteParams = { 
  slug: string,
}

export type RouteContext = { 
  params: Promise<RouteParams>, 
}

export abstract class BaseContentHandler<T extends { slug: string; title: string; blocks?: BaseBlock[] | null }> {
  protected abstract fetcher: Fetcher<T>

  async render(context: RouteContext): Promise<JSX.Element> {
    const content = await this.fetcher.get((await context.params).slug)
    if (!content) notFound()

    return <>{this.renderBlocks(content.blocks)}</>
  }

  async generateMetadata(context: RouteContext): Promise<Metadata> {
    const content = await this.fetcher.get((await context.params).slug)
    return content ? { title: content.title } : {}
  }

  private renderBlocks(blocks?: BaseBlock[] | null): JSX.Element[] {
    return (
      blocks?.map((block) => {
        const render = blockRenderers[block.blockType]
        return render ? render(block) : null
      })
      .filter(Boolean) as JSX.Element[]
    )
  }
}
