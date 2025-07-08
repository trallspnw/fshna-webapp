import type { Metadata } from 'next'
import type { Fetcher } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BaseBlock, renderBlocks } from '@common/lib/blockUtil'
import { BodyLayout } from '@common/components/BodyLayout'
import { LocalizedText } from '@common/types/language'
import { getLocalizedValue } from '@common/lib/translation'

export type RouteParams = { 
  slug: string,
}

export type RouteContext = { 
  params: Promise<RouteParams>, 
}

type ContentWithBlocks = {
  slug: string
  pageTitle?: LocalizedText
  blocks?: BaseBlock[] | null
}

export abstract class BaseContentHandler<T extends ContentWithBlocks> {
  protected abstract fetcher: Fetcher<T>

  protected renderBeforeBody(context: RouteContext, content: T): JSX.Element | null {
    return null
  }

  async render(context: RouteContext): Promise<JSX.Element> {
    const content = await this.fetcher.get((await context.params).slug)
    if (!content) notFound()

    const navItems = await this.fetcher.getNavItems();
    const blocks = content.blocks || []
    const [firstBlock, ...remainingBlocks] = content.blocks || []
    const isHero = firstBlock?.blockType === 'hero'
    const heroBlock = isHero ? firstBlock : null
    const bodyBlocks = isHero ? remainingBlocks : blocks

    return (
      <BodyLayout
        navItems={navItems}
        hero={heroBlock ? renderBlocks([heroBlock]) : undefined}
      >
        {this.renderBeforeBody(context, content)}
        {renderBlocks(bodyBlocks)}
      </BodyLayout>
    )
  }

  async generateMetadata(context: RouteContext): Promise<Metadata> {
    const content = await this.fetcher.get((await context.params).slug)
    // TODO - genereate for en/es
    return content ? { title: getLocalizedValue(content.pageTitle, 'en') } : {}
  }
}
