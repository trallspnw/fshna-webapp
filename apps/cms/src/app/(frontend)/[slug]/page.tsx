import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug = 'home' } = await params;
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const page = result.docs[0];

  if (!page) return <div>Page not found.</div>;

  return (
    <main>
      <h1>{page.title}</h1>
      <div>{page.content}</div>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = 'home' } = await params;
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const page = result.docs[0];
  return { title: page?.title || 'FSHNA' };
}
