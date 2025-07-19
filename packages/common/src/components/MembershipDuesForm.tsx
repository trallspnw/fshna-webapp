'use client'

import { useState } from "react"
import { useLanguage } from "../hooks/useLanguage"
import { LocalizedText } from "../types/language"
import { Button, Group, Text, Textarea, TextInput } from "@mantine/core"
import { getLocalizedValue } from "../lib/translation"
import classes from './MembershipDuesForm.module.scss'
import { isValidEmail, isValidUsPhone } from "../lib/validation"

type DonationFormProps = {
  emailLabel?: LocalizedText
  emailPlaceholder?: LocalizedText
  emailValidationError?: LocalizedText
  phoneLabel?: LocalizedText
  phonePlaceholder?: LocalizedText
  phoneValidationError?: LocalizedText
  addressLabel?: LocalizedText
  addressPlaceholder?: LocalizedText
  addressValidationError?: LocalizedText
  submitButtonText: LocalizedText
  priceLabel: LocalizedText
  membershipPrice: number
}

export function MembershipDuesForm(props: DonationFormProps) {
  const [language] = useLanguage()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneNormalized, setPhoneNormalized] = useState('')
  const [address, setAddress] = useState('')

  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [addressError, setAddressError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = true

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

    if (!isValid) return

    // TODO - Link to Stripe
    const stripeUrl = 'https://stripe.com'
    //window.location.href = stripeUrl
    console.log('Mock payment redirect: ' + stripeUrl)
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Group gap="xs" wrap="wrap" align="end" justify="flex-end">
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
        />

        <Textarea
          label={getLocalizedValue(props.addressLabel, language, 'Address')}
          placeholder={getLocalizedValue(props.addressPlaceholder, language) ?? undefined}
          autosize={true}
          minRows={3}
          value={address}
          onChange={(e) => {
            setAddress(e.currentTarget.value)
            setAddressError(null)
          }}
          error={addressError}
          className={classes.input}
        />
        
        <span className={classes.checkoutRow}>
          <Text fw="700">
            {getLocalizedValue(props.priceLabel, language)}:{'\u00A0'}
            {new Intl.NumberFormat(language, {
              style: 'currency',
              currency: 'USD',
            }).format(10)}
          </Text>
          <Button type="submit" variant="filled" className={classes.button}>
            {getLocalizedValue(props.submitButtonText, language)}
          </Button>
        </span>
      </Group>
    </form>
  )
}
