import type { Metadata } from 'next'
import type { Fetcher } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { Page, TextBlock } from '@common/types/payload-types'
import { Text } from '@common/components/blocks/Text'
import { Language } from '@common/types/language'

export type RouteParams = {
  slug: string,
}

export type RouteContext = {
  params: Promise<RouteParams>,
}

export abstract class BasePageHandler {
  protected readonly COLLECTION = 'pages'
  protected abstract fetcher: Fetcher<Page>

  async render(context: RouteContext): Promise<JSX.Element> {
    const page = await this.fetcher.get((await context.params).slug)

    if (!page) {
      return (
        <span>404</span>
      )
    }

    return (
      <div>
        <h1>{page.title}</h1>
        <p>{page.content}</p>
          {page.blocks?.map((block: TextBlock, index: number) => {
            switch (block.blockType) {
              case 'text-block':
                return (
                  <Text
                    key={index}
                    text={this.normalizeLocalizedText(block.text)}
                  />
                )
              default:
                return null
            }
          })}
      </div>
    )
  }

  async generateMetadata(context: RouteContext): Promise<Metadata> {
    const page = await this.fetcher.get((await context.params).slug)

    if (!page) {
      return {}
    }

    return {
      title: page.title,
    }
  }

  // TODO - clean this up
  private normalizeLocalizedText(
    input: Partial<Record<string, string | null | undefined>> | undefined
  ): Partial<Record<Language, string>> {
    if (!input) return {}
  
    const result: Partial<Record<Language, string>> = {}
  
    for (const [language, value] of Object.entries(input)) {
      if (value != null) {
        result[language as Language] = value
      }
    }
  
    return result
  }
  
}
