import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Fetcher } from '@common/fetchers/fetcher'
import { Page } from '@common/types/payload-types'

export class CmsPageFetcher extends Fetcher<Page> {
  private async getPayloadInstance() {
    return await getPayload({ config: configPromise })
  }

  async get(slug: string): Promise<Page> {
    const payload = await this.getPayloadInstance()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] as Page
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
