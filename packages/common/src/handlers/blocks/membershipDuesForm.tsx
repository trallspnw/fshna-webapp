import { JSX } from 'react'
import { General, MembershipDuesForm as MembershipDuesFormType } from '@common/types/payload-types'
import { MembershipDuesForm } from '../../components/MembershipDuesForm'

/**
 * Handles rendering of membership dues form blocks.
 */
export function render(
  block: MembershipDuesFormType,
  index: number,
  fetchers: any,
  generalGlobals: General,
): JSX.Element {

  return (
    <MembershipDuesForm
      key={index}
      emailLabel={generalGlobals.email?.emailLabel}
      emailPlaceholder={generalGlobals.email?.emailPlaceholder}
      emailValidationError={generalGlobals.email?.emailValidationError}
      nameLabel={generalGlobals.name?.nameLabel}
      namePlaceholder={generalGlobals.name?.namePlaceholder}
      nameValidationError={generalGlobals.name?.nameValidationError}
      phoneLabel={generalGlobals.phone?.phoneLabel}
      phonePlaceholder={generalGlobals.phone?.phonePlaceholder}
      phoneValidationError={generalGlobals.phone?.phoneValidationError}
      addressLabel={generalGlobals.address?.addressLabel}
      addressPlaceholder={generalGlobals.address?.addressPlaceholder}
      addressValidationError={generalGlobals.address?.addressValidationError}
      submitButtonText={block.submitButtonText}
      priceLabel={block.priceLabel}
      membershipPrice={generalGlobals.membershipPrice}
      itemName={block.itemName}
      existingMembershipMessage={block.existingMembershipMessage}
      serverFailureMessage={block.serverFailureMessage}
    />
  )
}
