import type { Metadata } from 'next'
import type { Fetcher, Fetchers } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BaseBlock, renderBlocks } from '@common/lib/blockUtil'
import { BodyLayout } from '@common/components/BodyLayout'
import { LocalizedMedia, LocalizedText } from '@common/types/language'
import { getLocalizedValue } from '@common/lib/translation'
import { Footer, General } from '../types/payload-types'
import { FooterProps, SocialChannel } from '../components/Footer'

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
  protected abstract allFetchers: Fetchers

  protected renderBeforeBody(context: RouteContext, content: T): JSX.Element | null {
    return null
  }

  async render(context: RouteContext): Promise<JSX.Element> {
    const content = await this.fetcher.get((await context.params).slug)
    if (!content) notFound()

    const navItems = await this.fetcher.getNavItems();
    const footer = await this.fetcher.getGlobalData<Footer>('footer')
    const general = await this.fetcher.getGlobalData<General>('general')
    const blocks = content.blocks || []
    const [firstBlock, ...remainingBlocks] = content.blocks || []
    const isHero = firstBlock?.blockType === 'hero'
    const heroBlock = isHero ? firstBlock : null
    const bodyBlocks = isHero ? remainingBlocks : blocks

    return (
      <BodyLayout
        logo={general.logo}
        navItems={navItems}
        hero={heroBlock ? renderBlocks([heroBlock], this.allFetchers) : undefined}
        footer={mapFooterToProps(footer, general.logo)}
      >
        {this.renderBeforeBody(context, content)}
        {renderBlocks(bodyBlocks, this.allFetchers)}
      </BodyLayout>
    )
  }

  async generateMetadata(context: RouteContext): Promise<Metadata> {
    const content = await this.fetcher.get((await context.params).slug)
    // TODO - genereate for en/es
    return content ? { title: getLocalizedValue(content.pageTitle, 'en') } : {}
  }
}

function mapFooterToProps(footer: Footer, logo?: LocalizedMedia): FooterProps {
  return {
    logo: logo,
    description: footer.description,
    linkGroups: (footer.linkGroups ?? []).map(group => ({
      title: group.groupName,
      links: (group.links ?? []).map(link => ({
        href: link.href,
        label: link.label,
      })),
    })),
    socialLinks: Object.entries(footer.socialLinks ?? {}).reduce(
      (acc, [key, value]) => {
        if (value != null) acc[key as keyof typeof acc] = value
        return acc
      },
      {} as Partial<Record<SocialChannel, string>>
    ),
  }
}

