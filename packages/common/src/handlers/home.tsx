import type { Metadata } from 'next'
import type { JSX } from 'react'
import { BasePageHandler } from '@common/handlers/page'
import { RouteContext } from '@common/handlers/baseContent'

export abstract class BaseHomeHandler extends BasePageHandler {
  private readonly homeContext: RouteContext = {
    params: Promise.resolve({
      slug: 'home',
    }),
  }

  async render(): Promise<JSX.Element> {
    return super.render(this.homeContext)
  }

  async generateMetadata(): Promise<Metadata> {
    return super.generateMetadata(this.homeContext)
  }
}
