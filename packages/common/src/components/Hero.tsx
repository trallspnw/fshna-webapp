'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedMedia, LocalizedText } from '@common/types/language'
import { Button, ButtonProps } from '@common/components/Button'
import { Media } from '@common/components//Media'
import clsx from 'clsx'

type HeroProps = {
  heading: LocalizedText
  subheading?: LocalizedText
  media: LocalizedMedia
  ctas?: Omit<ButtonProps, 'className'>[]
  className?: string
}

export function Hero({ heading, subheading, media, ctas, className }: HeroProps) {
  const [language] = useLanguage()

  return (
    <header className={clsx('hero', className)}>
      <Media
        media={media}
        width={300}
        height={300}
        className="hero-background"
      />

      <div className="hero-body">
        <h1 className="hero-heading">
          {getLocalizedValue(heading, language)}
        </h1>

        {subheading && (
          <h2 className="hero-subheading">
            {getLocalizedValue(subheading, language)}
          </h2>
        )}

        {ctas && ctas?.length > 0 && (
          <div className="hero-ctas">
            {ctas.map((cta, idx) => (
              <Button
                key={idx}
                {...cta}
                className={clsx('hero-cta', `cta-${idx}`)}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
