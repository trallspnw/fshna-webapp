import { Page } from '@types'
import { PageFetcher } from '@ui/fetcher/PageFetcher'

export class SitePageFetcher extends PageFetcher {
  async getBySlug(slug: string): Promise<Page | null> {
    const res = await fetch(`${process.env.CMS_URL}/api/pages?where[slug][equals]=${slug}`)
    const data = await res.json()
    return data?.docs?.[0] || null
  }

  async getAll(): Promise<Page[]> {
    const res = await fetch(`${process.env.CMS_URL}/api/pages?limit=100`)
    const data = await res.json()
    return data?.docs || []
  }
}
