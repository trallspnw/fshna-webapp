import { Fetcher } from '@common/fetchers/fetcher'
import { Page } from '@common/types/payload-types'

export class SitePageFetcher extends Fetcher<Page> {
  async get(slug: string): Promise<Page> {
    const res = await fetch(`${process.env.CMS_URL}/api/pages?where[slug][equals]=${slug}`)
    const data = await res.json()
    return data.docs[0] as Page
  }

  async getAll(): Promise<Page[]> {
    const res = await fetch(`${process.env.CMS_URL}/api/pages?limit=100`)
    const data = await res.json()
    return data.docs as Page[]
  }
}
