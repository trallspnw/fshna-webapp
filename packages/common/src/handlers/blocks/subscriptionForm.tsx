import { JSX } from 'react'
import { General, SubscriptionForm as MembershipStatusFormType } from '@common/types/payload-types'
import { SubscriptionForm } from '../../components/SubscriptionForm'

/**
 * Handles rendering of subscription form blocks.
 */
export function render(
  block: MembershipStatusFormType,
  index: number,
  fetchers: any,
  generalGlobals: General,
): JSX.Element {

  return (
    <SubscriptionForm
      key={index}
      backendUrl={process.env.BASE_URL || ''}
      emailLabel={generalGlobals.email?.emailLabel}
      emailPlaceholder={generalGlobals.email?.emailPlaceholder}
      emailValidationError={generalGlobals.email?.emailValidationError}
      submitButtonText={block.submitButtonText}
      successHeading={block.successHeading}
      successMessage={block.successMessage}
      failureHeading={block.failureHeading}
      failureMessage={block.failureMessage}
    />
  )
}
