import type { Metadata } from 'next'
import type { PageFetcher } from '@types'
import type { JSX } from 'react'

export type RouteParams = {
  slug: string,
}

export type RouteContext = {
  params: Promise<RouteParams>,
}

export abstract class BasePageHandler {
  protected abstract fetcher: PageFetcher

  async render(context: RouteContext): Promise<JSX.Element> {
    const page = await this.fetcher.getBySlug((await context.params).slug)

    if (!page) {
      return (
        <main>
          <h1>Page Not Found</h1>
          <p>The requested page could not be located.</p>
        </main>
      )
    }

    return (
      <main>
        <h1>{page.title}</h1>
        <div>{page.content}</div>
      </main>
    )
  }

  async generateMetadata(context: RouteContext): Promise<Metadata> {
    const page = await this.fetcher.getBySlug((await context.params).slug)

    return {
      title: page?.title || 'FSHNA',
    }
  }
}
