import { Fetcher } from '@common/fetchers/fetcher'

import type { Page } from '@common/types/payload-types'

export abstract class PageFetcher extends Fetcher<Page> {
  abstract getBySlug(slug: string): Promise<Page | null>
  abstract getAll(): Promise<Page[]>
}
