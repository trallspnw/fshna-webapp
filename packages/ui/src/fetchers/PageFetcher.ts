import { Fetcher } from './Fetcher'

import type { Page } from '@types'

export abstract class PageFetcher extends Fetcher<Page> {
  abstract getBySlug(slug: string): Promise<Page | null>
  abstract getAll(): Promise<Page[]>
}
