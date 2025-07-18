'use client'

import { useState } from 'react'
import { TextInput, Button, Modal, Group, Stack, Loader } from '@mantine/core'
import { LocalizedText } from '../types/language'
import { useLanguage } from '../hooks/useLanguage'
import { getLocalizedValue } from '../lib/translation'
import classes from './MembershipStatusForm.module.scss'
import { isValidEmail } from '../lib/validation'

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

export function MembershipStatusForm({
  emailLabel,
  emailPlaceholder,
  emailValidationError,
  submitButtonText,
  successHeading,
  successMessage,
  failureHeading,
  failureMessage,
}: MembershipStatusFormProps) {
  const [language] = useLanguage()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValidEmail(email)) {
      setEmailError(getLocalizedValue(emailValidationError, language, 'Invalid email'))
      return
    }

    setEmailError(null)
    setLoading(true)
    setModalOpen(true)

    // Simulate network delay
    setTimeout(() => {
      setIsSuccess(!email.includes('failure')) // mock failure
      setLoading(false)
    }, 3000)
  }

  const heading = isSuccess
    ? getLocalizedValue(successHeading, language)
    : getLocalizedValue(failureHeading, language)

  const message = isSuccess
    ? getLocalizedValue(successMessage, language)
    : getLocalizedValue(failureMessage, language)

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Group gap="xs" wrap="wrap" align="end" justify='flex-end'>
          <TextInput
            label={getLocalizedValue(emailLabel, language, 'Email')}
            placeholder={getLocalizedValue(emailPlaceholder, language) ?? undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value)
              setEmailError(null)
            }}
            error={emailError}
            required
            className={classes.input}
          />
          <Button 
            type="submit"
            variant="filled"
            className={classes.button}
          >
            {getLocalizedValue(submitButtonText, language)}
          </Button>
        </Group>
      </form>

      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setIsSuccess(null)
          setLoading(false)
        }}
        title={loading ? '' : heading}
        centered
      >
        {loading ? (
          <Stack align="center" py="xl">
            <Loader />
          </Stack>
        ) : (
          message
        )}
      </Modal>
    </>
  )
}
