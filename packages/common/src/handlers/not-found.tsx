import type { Metadata } from 'next'
import type { JSX } from 'react'
import { BasePageHandler, RouteContext } from './page'

export abstract class BaseNotFoundHandler extends BasePageHandler {
  private readonly homeContext: RouteContext = {
    params: Promise.resolve({
      slug: 'not-found',
    }),
  }

  async render(): Promise<JSX.Element> {
    return super.render(this.homeContext)
  }

  async generateMetadata(): Promise<Metadata> {
    return super.generateMetadata(this.homeContext)
  }
}
