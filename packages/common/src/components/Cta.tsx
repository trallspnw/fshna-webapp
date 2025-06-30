// Adapted from https://ui.mantine.dev/category/hero/

'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedText } from '@common/types/language'
import clsx from 'clsx'
import { Button } from '@mantine/core'
import classes from './Cta.module.scss';

type CtaProps = {
  label: LocalizedText
  href: string
  secondary?: boolean
}

export function Cta({ label, href, secondary }: CtaProps) {
  const [language] = useLanguage()

  return (
    <Button
      component='a'
      href={href}
      size='lg'
      className={clsx(
        classes.button, 
        {
          [classes.secondaryButton]: secondary,
        })}
    >
      {getLocalizedValue(label, language)}
    </Button>
  )
}
