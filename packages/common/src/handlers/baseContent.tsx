import type { Metadata } from 'next'
import type { Fetcher, Fetchers } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BaseBlock, renderBlocks } from '@common/lib/blockUtil'
import { BodyLayout } from '@common/components/BodyLayout'
import { DEFAULT_LANGUAGE, LocalizedMedia, LocalizedText } from '@common/types/language'
import { getLocalizedValue } from '@common/lib/translation'
import { Footer, General } from '../types/payload-types'
import { FooterProps } from '../components/Footer'
import { normalizeMedia, rewriteMediaUrl } from '../lib/mediaUtil'

export type RouteParams = { 
  slug: string,
}

export type RouteContext = { 
  params: Promise<RouteParams>, 
}

type ContentWithBlocks = {
  slug: string
  title?: LocalizedText
  blocks?: BaseBlock[] | null
}

export abstract class BaseContentHandler<T extends ContentWithBlocks> {
  protected abstract fetcher: Fetcher<T>
  protected abstract allFetchers: Fetchers

  protected renderBeforeBody(context: RouteContext, content: T, general: General): JSX.Element | null {
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
    const logo = normalizeMedia(general.logo)

    return (
      <BodyLayout
        logo={logo}
        navItems={navItems}
        hero={heroBlock ? renderBlocks([heroBlock], this.allFetchers, general) : undefined}
        footer={mapFooterToProps(footer, logo)}
      >
        {this.renderBeforeBody(context, content, general)}
        {renderBlocks(bodyBlocks, this.allFetchers, general)}
      </BodyLayout>
    )
  }

  async generateMetadata(context: RouteContext): Promise<Metadata> {
    const content = await this.fetcher.get((await context.params).slug)
    const general = await this.fetcher.getGlobalData<General>('general')

    const titlePref = content && content.title && content.slug !== 'home' ? `${getLocalizedValue(content.title, DEFAULT_LANGUAGE)} | ` : ''
    const favicon = getLocalizedValue(normalizeMedia(general.icon), DEFAULT_LANGUAGE) ?? undefined

    return { 
      title: `${titlePref}${getLocalizedValue(general.baseTitle, DEFAULT_LANGUAGE)}`,
      icons: {
        icon: favicon ? rewriteMediaUrl(favicon.url) : undefined,
      },
      // TODO - pull from config when ready to launch
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      },
    }
  }
}

function mapFooterToProps(footer: Footer, logo?: LocalizedMedia): FooterProps {
  return {
    logo: logo,
    slogan: footer.slogan,
    linkGroups: (footer.linkGroups ?? []).map(group => ({
      title: group.groupName,
      links: (group.links ?? []).map(link => ({
        href: link.url,
        label: link.label,
      })),
    })),
    socialLinks: footer.socialLinks?.map(link => link.url) ?? [],
  }
}

