import { JSX } from 'react'
import { General, OrderSummary as OrderSummaryType } from '@common/types/payload-types'
import { OrderSummary } from '../../components/OrderSummary'

export function render(
  block: OrderSummaryType,
  index: number,
  fetchers: any,
  generalGlobals: General,
): JSX.Element {

  return (
    <OrderSummary
      key={index}
      heading={block.heading}
      paidStatus={block.paidStatus}
      unpaidStatus={block.unpaidStatus}
      totalPaidLabel={block.totalPaidLabel}
      loadingText={block.loadingText}
      orderNotFoundText={block.orderNotFoundText}
      returnButtonText={block.returnButtonText}
      retryButtonText={block.retryButtonText}
    />
  )
}
