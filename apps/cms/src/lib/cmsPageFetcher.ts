import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageFetcher } from '@common/fetchers/pageFetcher'
import { Page } from '@common/types/payload-types'

export class CmsPageFetcher extends PageFetcher {
  private async getPayloadInstance() {
    return await getPayload({ config: configPromise })
  }

  async getBySlug(slug: string): Promise<Page | null> {
    const payload = await this.getPayloadInstance()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs?.[0] as Page || null
  }

  async getAll(): Promise<Page[]> {
    const payload = await this.getPayloadInstance()
    const result = await payload.find({
      collection: 'pages',
      limit: 100,
    })
    return result.docs as Page[]
  }
}
