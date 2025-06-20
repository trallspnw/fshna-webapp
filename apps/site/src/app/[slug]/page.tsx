import renderPage from '@ui/routes/[slug]/page'
import { SitePageFetcher } from '@site/lib/SitePageFetcher'

const SitePage = (ctx: { params: Promise<{ slug: string }> }) =>
  renderPage({ ...ctx, fetcher: new SitePageFetcher() })

export default SitePage

export async function generateStaticParams() {
  const pages = await new SitePageFetcher().getAll()
  return pages.map((page) => ({ slug: page.slug }))
}
