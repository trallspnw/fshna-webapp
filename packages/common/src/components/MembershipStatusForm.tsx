'use client'

import { useState } from 'react'
import { LocalizedText, SUPPORTED_LANGUAGES } from '../types/language'
import { EmailForm } from './EmailForm'
import { getLocalizedValue } from '../lib/translation'

type MembershipStatusFormProps = {
  emailLabel?: LocalizedText
  emailPlaceholder?: LocalizedText
  emailValidationError?: LocalizedText
  submitButtonText: LocalizedText
  successHeading: LocalizedText
  statusText: LocalizedText
  activeText: LocalizedText
  inactiveText: LocalizedText
  expiresText: LocalizedText
  failureHeading: LocalizedText
  failureMessage: LocalizedText
}

/**
 * A form component for checking membership status. Uses a common EmailForm component.
 */
export function MembershipStatusForm(props: MembershipStatusFormProps) {
  const [message, setMessage] = useState({})

  const handleSubmit = async (email: string): Promise<boolean> => {
    try {
      const result = await fetch(`/api/membership/check?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!result.ok) {
        return result.ok
      }

      const data = await result.json()

      setMessage(buildMessage(props, data.isMember, data.expiresAt))

      return result.ok
    } catch (err) {
      console.error(err)
      return false
    }
  }

  return (
    <EmailForm
      {...props}
      successMessage={message}
      actionHandler={handleSubmit}
    />
  )
}

/**
 * Helper for building a localized status message using the block config, membership status, and membership expiration.
 */
function buildMessage(props: MembershipStatusFormProps, isActive: boolean, expires?: string) {
  const message: LocalizedText = {}

  for (const language of SUPPORTED_LANGUAGES) {
    const statusLine = `${getLocalizedValue(props.statusText, language)}:\u00A0` +
      `${isActive 
        ? getLocalizedValue(props.activeText, language) 
        : getLocalizedValue(props.inactiveText, language)}`

    const expiresLine = isActive && expires
      ? `\n${getLocalizedValue(props.expiresText, language)}:\u00A0` +
        `${new Intl.DateTimeFormat(language, { dateStyle: 'long' }).format(new Date(expires))}`
      : ''

    message[language] = statusLine + expiresLine
  }

  return message
}
