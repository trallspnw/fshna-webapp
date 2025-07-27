'use client'

import { useState } from "react"
import { Button, Gutter } from "@payloadcms/ui";

type EmailOption = {
  slug: string
  title: string
}

type BroadcastClientProps = {
  emails: EmailOption[]
}

export function BroadcastClient({ emails }: BroadcastClientProps) {
  const [selectedEmailSlug, setSelectedEmailSlug] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSend = async () => {
    if (!selectedEmailSlug) return

    setIsSending(true)
    setStatusMessage(null)

    try {
      const result = await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailSlug: selectedEmailSlug }),
        credentials: 'include',
      })

      const json = await result.json()
      setStatusMessage(json.message || 'Broadcast sent.')
    } catch (e) {
      console.error(e)
      setStatusMessage('Failed to send email.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Gutter>
      <h1>Broadcast Email</h1>
      <p>Select an email to send to all subscribers.</p>
      <br />

      <div>
        <label htmlFor='emailSelect'>Email:</label>
        <br />
        <select
          id='emailSelect'
          value={selectedEmailSlug ?? ''}
          onChange={(e) => setSelectedEmailSlug(e.target.value)}
        >
          <option value=''>-- Select --</option>
          {emails.map(email => (
            <option key={email.slug} value={email.slug}>
              {email.title}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={handleSend} disabled={!selectedEmailSlug || isSending}>
        {isSending ? 'Sending...' : 'Send'}
      </Button>

      {statusMessage && <p>{statusMessage}</p>}
    </Gutter>
  )
}
