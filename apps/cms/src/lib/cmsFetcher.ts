import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Fetcher, FetchOptions } from '@common/fetchers/fetcher'

export class CmsFetcher<T> extends Fetcher<T> {
  constructor(private collection: string) {
    super()
  }

  private async getPayloadInstance() {
    return await getPayload({ config: configPromise })
  }

  async get(slug: string): Promise<T | null> {
    const payload = await this.getPayloadInstance()
    const result = await payload.find({
      collection: this.collection,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as T) ?? null
  }

  async getAll(options: FetchOptions = {}): Promise<T[]> {
    const payload = await this.getPayloadInstance()
    const { limit = 100, sortOptions } = options
    const sort = sortOptions
      ? `${sortOptions.sortOrder === 'desc' ? '-' : ''}${sortOptions.sortBy}`
      : undefined

    const result = await payload.find({
      collection: this.collection,
      limit,
      ...(sort && { sort }),
    })

    return result.docs as T[]
  }
}
