import { Page } from '@types'

type PageFetcher = {
  getBySlug(slug: string): Promise<Page | null>
}

export default async function renderPage({
  params,
  fetcher,
}: {
  params: Promise<{ slug?: string }>
  fetcher: PageFetcher
}) {
  const { slug = 'home' } = await params
  const page = await fetcher.getBySlug(slug)

  if (!page) return <div>Page not found</div>

  return (
    <main>
      <h1>{page.title}</h1>
      <div>{page.content}</div>
    </main>
  )
}
