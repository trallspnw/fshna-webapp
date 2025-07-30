'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '../hooks/useLanguage'
import { getLocalizedValue } from '../lib/translation'
import { LocalizedText } from '../types/language'
import { Alert, Button, Group, List, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

type OrderSummaryProps = {
  heading: LocalizedText
  paidStatus: LocalizedText,
  unpaidStatus: LocalizedText,
  totalPaidLabel: LocalizedText,
  loadingText: LocalizedText,
  orderNotFoundText?: LocalizedText
  returnButtonText?: LocalizedText
  retryButtonText?: LocalizedText
}

type StripeSession = {
  id: string
  amount_total: number
  payment_status: string
  url: string
  metadata: {
    itemName?: string
    entryUrl?: string
  }
}

export function OrderSummary({
  heading,
  paidStatus,
  unpaidStatus,
  totalPaidLabel,
  loadingText,
  orderNotFoundText,
  returnButtonText,
  retryButtonText,
}: OrderSummaryProps) {
  const [language] = useLanguage()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [session, setSession] = useState<StripeSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const id = params.get('sessionId')
      if (!id) {
        setLoading(false)
      }
      setSessionId(id)
    }
  }, [])

  useEffect(() => {
    if (!sessionId) {
      return
    }
    fetch(`/api/payment?sessionId=${sessionId}`)
      .then(result => result.ok ? result.json() : null)
      .then(data => setSession(data?.sessionData ?? null))
      .finally(() => setLoading(false))
  }, [sessionId])

  let innerDetails

  if (loading) {
    innerDetails = (
      <Alert 
        color='blue' 
        variant='light'
      >
        <Group gap='xs' align='center'>
          <Loader size='sm' />
          <Text>{getLocalizedValue(loadingText, language)}</Text>
        </Group>
      </Alert>
    )
  } else  if (!sessionId || (!loading && !session)) {
    innerDetails = (
     <Alert 
      icon={<IconInfoCircle />} 
      color='red' 
      variant='light'
    >
      {getLocalizedValue(orderNotFoundText, language)}
    </Alert>
    )
  } else {
    const alert = session!.payment_status === 'paid' ? 
    (
      <Alert 
        icon={<IconInfoCircle />} 
        color='green' 
        variant='light'
        fw={700}
      >
        {getLocalizedValue(paidStatus, language)}
      </Alert>
    ) : (
      <Alert 
        icon={<IconInfoCircle />} 
        color='yellow' 
        variant='light'
        fw={700}
      >
        {getLocalizedValue(unpaidStatus, language)}
      </Alert>
    )

    innerDetails = (
      <>
        <List>
          <List.Item>
            {session!.metadata.itemName}
          </List.Item>
        </List>
        <Text fw={700}>
          {getLocalizedValue(totalPaidLabel, language)}:{'\u00A0'}
          {new Intl.NumberFormat(language, {
            style: 'currency',
            currency: 'USD',
          }).format(session!.amount_total / 100)}
        </Text>
        {alert}
      </> 
    )
  }

  return (
    <>
      <Paper shadow='md' p='lg' withBorder>
        <Stack gap='md'>
          <Title order={4}>{getLocalizedValue(heading, language)}</Title>
          {innerDetails}
        </Stack>
      </Paper>
       <Group justify='flex-end' mt='md'>
        {returnButtonText && session?.metadata?.entryUrl && (
          <Button
            component='a'
            href={session.metadata.entryUrl}
            variant={session.payment_status === 'paid' ? 'filled' : 'outline'}
          >
            {getLocalizedValue(returnButtonText, language)}
          </Button>
        )}
        {retryButtonText && session?.url && (
          <Button
            component='a'
            href={session.url}
            variant='filled'
          >
            {getLocalizedValue(retryButtonText, language)}
          </Button>
        )}
      </Group>
    </>
  )
}
