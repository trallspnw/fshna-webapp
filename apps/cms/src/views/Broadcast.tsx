import { DefaultTemplate } from '@payloadcms/next/templates'
import { BroadcastClient } from './BroadcastClient'
import { getPayload, AdminViewServerProps } from 'payload'
import configPromise from '@payload-config'

export default async function Broadcast({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
  const payload = await getPayload({ config: configPromise })

  const emails = await payload.find({
    collection: 'emails',
    limit: 100,
    sort: '-createdAt',
  })

  const emailOptions = emails?.docs?.map((doc) => ({
    slug: doc.slug,
    title: doc.internalName,
  })) ?? []

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <BroadcastClient emails={emailOptions} />
    </DefaultTemplate>
  )
}
