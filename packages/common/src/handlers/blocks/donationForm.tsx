import { JSX } from 'react'
import { General, DonationForm as DonationFormType } from '@common/types/payload-types'
import { DonationForm } from '../../components/DonationForm'

export function render(
  block: DonationFormType,
  index: number,
  fetchers: any,
  generalGlobals: General,
): JSX.Element {

  return (
    <DonationForm
      key={index}
      amountLabel={block.amountLabel}
      amountPlaceholder={block.amountPlaceholder}
      amountValidationError={block.amountValidationError}
      nameLabel={generalGlobals.name?.nameLabel}
      namePlaceholder={generalGlobals.name?.namePlaceholder}
      nameValidationError={generalGlobals.name?.nameValidationError}
      emailLabel={generalGlobals.email?.emailLabel}
      emailPlaceholder={generalGlobals.email?.emailPlaceholder}
      emailValidationError={generalGlobals.email?.emailValidationError}
      phoneLabel={generalGlobals.phone?.phoneLabel}
      phonePlaceholder={generalGlobals.phone?.phonePlaceholder}
      phoneValidationError={generalGlobals.phone?.phoneValidationError}
      addressLabel={generalGlobals.address?.addressLabel}
      addressPlaceholder={generalGlobals.address?.addressPlaceholder}
      addressValidationError={generalGlobals.address?.addressValidationError}
      submitButtonText={block.submitButtonText}
      itemName={block.itemName}
    />
  )
}
