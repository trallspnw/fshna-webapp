import renderPage from '@ui/routes/[slug]/page'
import { SitePageFetcher } from '@site/lib/SitePageFetcher'

const SitePage = (ctx: { params: Promise<{ slug: string }> }) =>
  renderPage({ ...ctx, fetcher: new SitePageFetcher() })

export default SitePage

export async function generateStaticParams() {
  const pages = await new SitePageFetcher().getAll()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await new SitePageFetcher().getBySlug(slug)
  return { title: page?.title }
}