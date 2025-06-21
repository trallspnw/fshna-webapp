import renderPage from '@ui/routes/[slug]/page'
import { CmsPageFetcher } from '@cms/lib/CmsPageFetcher'

const CmsPage = (ctx: { params: Promise<{ slug: string }> }) =>
  renderPage({ ...ctx, fetcher: new CmsPageFetcher() })

export default CmsPage

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug = 'home' } = await params
  const page = await new CmsPageFetcher().getBySlug(slug)
  return { title: page?.title }
}
