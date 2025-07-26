import { useState } from "react"
import { useLanguage } from "../hooks/useLanguage"
import { LocalizedText } from "../types/language"
import { getLocalizedValue } from "../lib/translation"
import { Button, Group, Loader, Modal, Stack, TextInput, Text } from "@mantine/core"
import classes from './EmailForm.module.scss'
import { isValidEmail } from "../lib/validation"

type EmailFormProps = {
  emailLabel?: LocalizedText
  emailPlaceholder?: LocalizedText
  emailValidationError?: LocalizedText
  submitButtonText: LocalizedText
  successHeading: LocalizedText
  successMessage: LocalizedText
  failureHeading: LocalizedText
  failureMessage: LocalizedText
  actionHandler:  (email: string) => Promise<boolean>
}

export function EmailForm({
  emailLabel,
  emailPlaceholder,
  emailValidationError,
  submitButtonText,
  successHeading,
  successMessage,
  failureHeading,
  failureMessage,
  actionHandler,
}: EmailFormProps) {
  const [language] = useLanguage()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      
      if (!isValidEmail(email)) {
        setEmailError(getLocalizedValue(emailValidationError, language, 'Invalid email'))
        setLoading(false)
        return
      }
  
      setEmailError(null)
      setModalOpen(true)
  
      try {
        const result = await actionHandler(email)
        setIsSuccess(result)
      } catch {
        setIsSuccess(false)
      } finally {
        setLoading(false)
      }
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
            disabled={loading}
          />
          <Button 
            type="submit"
            variant="filled"
            className={classes.button}
            loading={loading}
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
          <Text style={{ whiteSpace: 'pre-line' }}>
            {message}
          </Text>
        )}
      </Modal>
    </>
  )

}