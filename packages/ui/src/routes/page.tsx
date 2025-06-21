import { Page } from '@types'

type PageFetcher = {
  getBySlug(slug: string): Promise<Page | null>
}

export default async function renderHomepage({
  fetcher,
}: {
  fetcher: PageFetcher
}) {
  const page = await fetcher.getBySlug('home')

  if (!page) return <div>Page not found</div>

  return (
    <main>
      <h1>{page.title}</h1>
      <div>{page.content}</div>
    </main>
  )
}
