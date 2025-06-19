type PageType = {
  title: string
  slug: string
  content: string
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.CMS_URL}/api/pages?limit=100`)
  const data = await res.json()

  return (data.docs || []).map((page: PageType) => ({
    slug: page.slug,
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const res = await fetch(`${process.env.CMS_URL}/api/pages?where[slug][equals]=${slug}`)
  const data = await res.json()
  const page: PageType = data?.docs?.[0]

  if (!page) return <div>Page not found</div>

  return (
    <main>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </main>
  )
}
