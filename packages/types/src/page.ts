import { Page } from '@types'

export interface PageFetcher {
  getBySlug(slug: string): Promise<Page | null>
  getAll?(): Promise<Page[]> 
}
