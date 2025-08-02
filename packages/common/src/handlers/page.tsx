import type { JSX } from 'react'
import { Page } from '@common/types/payload-types'
import { notFound } from 'next/navigation'
import { BaseContentHandler, RouteContext } from '@common/handlers/baseContent'

/**
 * Handles content rendering for the pages collection.
 */
export abstract class BasePageHandler extends BaseContentHandler<Page> {
  protected readonly COLLECTION = 'pages'

  async render(context: RouteContext): Promise<JSX.Element> {
    const page = await this.fetcher.get((await context.params).slug)

    if (!page) notFound()

    return super.render(context)
  }  
}
