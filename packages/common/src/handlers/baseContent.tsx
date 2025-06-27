import type { Metadata } from 'next'
import type { Fetcher } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BaseBlock, blockRenderers } from '@common/lib/blockConfig'

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
      blocks?.map((block, index) => {
        const render = blockRenderers[block.blockType]
        return render ? render(block, index) : null
      })
      .filter(Boolean) as JSX.Element[]
    )
  }
}
