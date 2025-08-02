import { DefaultTemplate } from '@payloadcms/next/templates'
import { AdminViewServerProps } from 'payload'
import { CampaignsClient } from './CampaignsClient'

/**
 * Server component viewing camplain reports.
 */
export default async function Campaigns({
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
      <CampaignsClient />
    </DefaultTemplate>
  )
}
