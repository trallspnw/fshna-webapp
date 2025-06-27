'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedText } from '@common/types/language'
import clsx from 'clsx'
import { Link } from '@common/components/Link'

export type ButtonType = 'primary' | 'secondary'

export type ButtonProps = {
  label: LocalizedText
  href?: string
  onClick?: () => void
  type?: ButtonType
  className?: string
}

export function Button({ label, href, onClick, type = 'primary', className }: ButtonProps) {
  const [language] = useLanguage()
  const text = getLocalizedValue(label, language)

  const classes = clsx(
    'button',
    `button-${type}`,
    className,
  )

  if (href) {
    return (
      <span className={classes}>
        <Link href={href}>
          {text}
        </Link>
      </span>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  )
}
