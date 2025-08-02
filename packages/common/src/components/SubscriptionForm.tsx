'use client'

import { useLanguage } from '../hooks/useLanguage'
import { LocalizedText } from '../types/language'
import { EmailForm } from './EmailForm'

type SubscriptionFormProps = {
  emailLabel?: LocalizedText
  emailPlaceholder?: LocalizedText
  emailValidationError?: LocalizedText
  submitButtonText: LocalizedText
  successHeading: LocalizedText
  successMessage: LocalizedText
  failureHeading: LocalizedText
  failureMessage: LocalizedText
}

/**
 * A form component for subscribing to emails. Uses a common EmailForm component.
 */
export function SubscriptionForm(props: SubscriptionFormProps) {
  const [language] = useLanguage()

  const handleSubmit = async (email: string): Promise<boolean> => {
    const ref = sessionStorage.getItem('ref') || undefined

    try {
      const result = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language, ref }),
      })

      return result.ok
    } catch (err) {
      console.error(err)
      return false
    }
  }

  return (
    <EmailForm
      {...props}
      actionHandler={handleSubmit}
    />
  )
}
