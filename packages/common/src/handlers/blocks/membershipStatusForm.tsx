import { JSX } from 'react'
import { General, MembershipStatusForm as MembershipStatusFormType } from '@common/types/payload-types'
import { MembershipStatusForm } from '../../components/MembershipStatusForm'

export function render(
  block: MembershipStatusFormType,
  index: number,
  fetchers: any,
  generalGlobals: General,
): JSX.Element {

  return (
    <MembershipStatusForm
      key={index}
      emailLabel={generalGlobals.email?.emailLabel}
      emailPlaceholder={generalGlobals.email?.emailPlaceholder}
      emailValidationError={generalGlobals.email?.emailValidationError}
      submitButtonText={block.submitButtonText}
      successHeading={block.successHeading}
      statusText={block.membershipStatus}
      activeText={block.active}
      inactiveText={block.inactive}
      expiresText={block.expires}
      failureHeading={block.failureHeading}
      failureMessage={block.failureMessage}
    />
  )
}
