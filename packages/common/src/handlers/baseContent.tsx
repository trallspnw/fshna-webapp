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

export abstract class BaseContentHandler<T extends { slug: string; pageTitle: LocalizedText; blocks?: BaseBlock[] | null }> {
  protected abstract fetcher: Fetcher<T>

  async render(context: RouteContext): Promise<JSX.Element> {
    const content = await this.fetcher.get((await context.params).slug)
    if (!content) notFound()

    const navItems = await this.fetcher.getNavItems();
    const blocks = content.blocks || []
    const [firstBlock, ...remainingBlocks] = content.blocks || []
    const isHero = firstBlock?.blockType === 'hero'
    const heroBlock = isHero ? firstBlock : null
    const bodyBlocks = isHero ? remainingBlocks : blocks

    console.log(JSON.stringify(heroBlock))

    return (
      <BodyLayout
        navItems={navItems}
        hero={heroBlock ? renderBlocks([heroBlock]) : undefined}
      >
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
