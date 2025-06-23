import type { Metadata } from 'next'
import type { Fetcher } from '@common/fetchers/fetcher'
import type { JSX } from 'react'
import { Event, TextBlock } from '@common/types/payload-types'
import { Text } from '@common/components/blocks/Text'
import { Language } from '@common/types/language'
import { notFound } from 'next/navigation'

export type RouteParams = { 
  slug: string,
}

export type RouteContext = { 
  params: Promise<RouteParams>, 
}

export abstract class BaseEventHandler {
  protected readonly COLLECTION = 'events'
  protected abstract fetcher: Fetcher<Event>

  async render(context: RouteContext): Promise<JSX.Element> {
    const event = await this.fetcher.get((await context.params).slug)

    if (!event) notFound()

    return (
      <div>
        <h1>{event.title}</h1>
        {event.blocks?.map((block: TextBlock, index: number) => {
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
    const event = await this.fetcher.get((await context.params).slug)

    if (!event) return {}

    return {
      title: event.title,
    }
  }

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
