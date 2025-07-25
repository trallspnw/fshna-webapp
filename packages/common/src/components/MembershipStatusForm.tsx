'use client'

import { LocalizedText } from '../types/language'
import { EmailForm } from './EmailForm'

type MembershipStatusFormProps = {
  emailLabel?: LocalizedText
  emailPlaceholder?: LocalizedText
  emailValidationError?: LocalizedText
  submitButtonText: LocalizedText
  successHeading: LocalizedText
  successMessage: LocalizedText
  failureHeading: LocalizedText
  failureMessage: LocalizedText
}

export function MembershipStatusForm(props: MembershipStatusFormProps) {

  const handleSubmit = async (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('RAN: Membership Status Handler')
        resolve(!email.includes('failure')) // mock failure for test
      }, 3000)
    })
  }

  return (
    <EmailForm
      {...props}
      actionHandler={handleSubmit}
    />
  )
}
