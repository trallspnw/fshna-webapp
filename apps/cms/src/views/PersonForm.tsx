'use client'

import { useState } from 'react'
import { Button } from '@payloadcms/ui'
import type { person } from '../../generated/prisma'
import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '@/packages/common/src/types/language'
import classes from './PersonForm.module.scss'
import { isValidEmail, isValidUsPhone } from '@/packages/common/src/lib/validation'

type PersonFormProps = {
  person?: person
  onSuccess: () => void
}

export function PersonForm({ person, onSuccess }: PersonFormProps) {
  const [formData, setFormData] = useState({
    email: person?.email || '',
    name: person?.name || '',
    phone: person?.phone || '',
    address: person?.address || '',
    language: person?.language || DEFAULT_LANGUAGE,
    ref: person?.ref || 'manual',
  })

  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const validate = () => {
    return isValidEmail(formData.email) &&
      (!formData.phone || isValidUsPhone(formData.phone))
  }

  const formIsValid = validate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(previous => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage(null)

    // Button should be disabled if not valid. This is an extra layer of validation.
    if (!validate()) {
      setStatusMessage('Invalid inputs.')
      setLoading(false)
      return
    }

    try {
      const method = person ? 'PATCH' : 'POST'
      const endpoint = person ? `/api/person/${person.id}` : `/api/person`

      const result = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (!result.ok) {
        const data = await result.json()
        throw new Error(data?.error || 'Request failed')
      }

      onSuccess()
    } catch (e) {
      if (e instanceof Error && e.message === 'EMAIL_ALREADY_EXISTS') {
        setStatusMessage('A user is already using this email address')
      } else {
        setStatusMessage('An error occurred when saving person.')
        console.error(e)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.labelInput}>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' value={formData.email} onChange={handleChange} required />
      </div>

      <div className={classes.labelInput}>
        <label htmlFor='name'>Name:</label>
        <input id='name' name='name' value={formData.name} onChange={handleChange} />
      </div>

      <div className={classes.labelInput}>
        <label htmlFor='phone'>Phone:</label>
        <input id='phone' name='phone' value={formData.phone} onChange={handleChange} />
      </div>

      <div className={classes.labelInput}>
        <label htmlFor='address'>Address:</label>
        <textarea
          id='address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className={classes.labelInput}>
        <label htmlFor='language'>Language:</label>
        <select
          id='language'
          name='language'
          value={formData.language}
          onChange={handleChange}
          required
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {LANGUAGE_LABELS[lang]}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.labelInput}>
        <label htmlFor='ref'>Ref:</label>
        <input id='ref' name='ref' value={formData.ref} onChange={handleChange} />
      </div>

      {statusMessage && <p className={classes.status}>{statusMessage}</p>}

      <div className={classes.buttonContainer}>
        <Button type='submit' disabled={loading || !formIsValid}>
          {loading ? 'Saving...' : person ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
