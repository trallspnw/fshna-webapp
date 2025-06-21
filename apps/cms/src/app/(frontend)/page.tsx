import renderHomepage from '@ui/routes/page'
import { CmsPageFetcher } from '@cms/lib/CmsPageFetcher'

export const dynamic = 'force-dynamic'

const CmsPage = () => renderHomepage({ fetcher: new CmsPageFetcher() })

export default CmsPage

export async function generateMetadata() {
  const page = await new CmsPageFetcher().getBySlug('home')
  return { title: page?.title || 'FSHNA' }
}
