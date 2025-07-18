import { JSX } from 'react'
import { General, MembershipStatusForm as MembershipStatusFormType } from '@common/types/payload-types'
import { MembershipStatusForm } from '../../components/MembershipStatusForm'

export function render(
  block: MembershipStatusFormType,
  index: number,
  fetchers: any,
  generalGlobals: General,
): JSX.Element {

  console.log(JSON.stringify(generalGlobals))
  return (
    <MembershipStatusForm
      key={index}
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
