import { DefaultTemplate } from '@payloadcms/next/templates'
import { AdminViewServerProps } from 'payload'
import { PeopleClient } from './PeopleClient'

/**
 * Server component for the custom people admin page.
 */
export default async function People({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
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
      <PeopleClient />
    </DefaultTemplate>
  )
}
