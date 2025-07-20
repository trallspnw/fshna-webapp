'use client'

import { useState } from "react"
import { useLanguage } from "../hooks/useLanguage"
import { LANGUAGES, LocalizedText } from "../types/language"
import { Button, Group, Textarea, TextInput } from "@mantine/core"
import { getLocalizedValue } from "../lib/translation"
import classes from './DonationForm.module.scss'
import { isValidEmail, isValidUsdAmount, isValidUsPhone } from "../lib/validation"

type DonationFormProps = {
  amountLabel?: LocalizedText
  amountPlaceholder?: LocalizedText
  amountValidationError?: LocalizedText
  emailLabel?: LocalizedText
  emailPlaceholder?: LocalizedText
  emailValidationError?: LocalizedText
  nameLabel?: LocalizedText
  namePlaceholder?: LocalizedText
  nameValidationError?: LocalizedText
  phoneLabel?: LocalizedText
  phonePlaceholder?: LocalizedText
  phoneValidationError?: LocalizedText
  addressLabel?: LocalizedText
  addressPlaceholder?: LocalizedText
  addressValidationError?: LocalizedText
  submitButtonText: LocalizedText
  itemName?: LocalizedText
}

export function DonationForm(props: DonationFormProps) {
  const [language] = useLanguage()
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneNormalized, setPhoneNormalized] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const [amountError, setAmountError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ref = sessionStorage.getItem('ref') || undefined

    let isValid = true

    if (!isValidUsdAmount(amount)) {
      setAmountError(getLocalizedValue(props.amountValidationError, language, 'Invalid amount'))
      isValid = false
    } else {
      setAmountError(null)
    }

    if (!isValidEmail(email)) {
      setEmailError(getLocalizedValue(props.emailValidationError, language, 'Invalid email'))
      isValid = false
    } else {
      setEmailError(null)
    }

    if (phone && !isValidUsPhone(phoneNormalized)) {
      setPhoneError(getLocalizedValue(props.phoneValidationError, language, 'Invalid phone'))
      isValid = false
    } else {
      setPhoneError(null)
    }

    if (!isValid) {
      setLoading(false)
      return
    }

    try {
      const result = await fetch('/api/donate/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount,
          itemName: getLocalizedValue(props.itemName, language),
          email, 
          name, 
          phone, 
          address,
          language,
          ref
        }),
      })

      if (!result.ok) throw new Error('Failed to initiate donation')

      const data = await result.json()

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl
    } else {
      throw new Error('Missing Stripe Checkout URL')
    }

    } catch (err) {
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Group gap="xs" wrap="wrap" align="end" justify="flex-end">
        <TextInput
          label={getLocalizedValue(props.amountLabel, language, 'Amount')}
          placeholder={getLocalizedValue(props.amountPlaceholder, language) ?? undefined}
          leftSection={language === LANGUAGES.EN ? '$' : undefined}
          rightSection={language === LANGUAGES.ES ? '$' : undefined}
          value={amount}
          onChange={(e) => {
            setAmount(e.currentTarget.value)
            setAmountError(null)
          }}
          error={amountError}
          required
          className={classes.input}
          disabled={loading}
        />

        <TextInput
          label={getLocalizedValue(props.emailLabel, language, 'Email')}
          placeholder={getLocalizedValue(props.emailPlaceholder, language) ?? undefined}
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

        <TextInput
          label={getLocalizedValue(props.nameLabel, language, 'Name')}
          placeholder={getLocalizedValue(props.namePlaceholder, language) ?? undefined}
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value)
          }}
          className={classes.input}
          disabled={loading}
        />

        <TextInput
          label={getLocalizedValue(props.phoneLabel, language, 'Phone')}
          placeholder={getLocalizedValue(props.phonePlaceholder, language) ?? undefined}
          value={phone}
          onChange={(e) => {
            setPhone(e.currentTarget.value)
            setPhoneNormalized(e.currentTarget.value.replace(/\D/g, ''))
            setPhoneError(null)
          }}
          error={phoneError}
          className={classes.input}
          disabled={loading}
        />

        <Textarea
          label={getLocalizedValue(props.addressLabel, language, 'Address')}
          placeholder={getLocalizedValue(props.addressPlaceholder, language) ?? undefined}
          autosize={true}
          minRows={3}
          value={address}
          onChange={(e) => {
            setAddress(e.currentTarget.value)
          }}
          className={classes.input}
          disabled={loading}
        />

        <Button 
          type="submit" 
          variant="filled" 
          className={classes.button}
          loading={loading}
        >
          {getLocalizedValue(props.submitButtonText, language)}
        </Button>
      </Group>
    </form>
  )
}
