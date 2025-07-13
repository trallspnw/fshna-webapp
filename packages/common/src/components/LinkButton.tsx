'use client'

import { Button } from '@mantine/core'
import { LocalizedText } from '../types/language'
import { getLocalizedValue } from '../lib/translation'
import { useLanguage } from '../hooks/useLanguage'

export type LinkButtonProps = {
  label: LocalizedText
  variant?: string
  href: string
}

export function LinkButton({ label, variant, href }: LinkButtonProps) {
  const [language] = useLanguage()

  return (
    <Button
      component='a'
      variant={variant}
      href={href}
    >
      {getLocalizedValue(label, language)}
    </Button>
  )
}
