// Adapted from https://ui.mantine.dev/category/hero/

'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { getLocalizedValue } from '@common/lib/translation'
import { LocalizedMedia, LocalizedText } from '@common/types/language'
import clsx from 'clsx'
import { Overlay, Title, Text, Container } from '@mantine/core'
import classes from './Hero.module.scss';
import { Cta } from './Cta'
import { rewriteMediaUrl } from '@common/lib/mediaUtil'

type HeroProps = {
  heading: LocalizedText
  subheading?: LocalizedText
  media: LocalizedMedia
  ctas?: {
    label: LocalizedText
    href: string
  }[]
  className?: string
}

export function Hero({ heading, subheading, media, ctas, className }: HeroProps) {
  const [language] = useLanguage()

  const mediaForLanguage = getLocalizedValue(media, language)
  const imageUrl = typeof mediaForLanguage === 'object' ? mediaForLanguage?.url ?? '' : ''

  return (
    <div className={classes.container}>
      <div
        className={clsx(classes.wrapper, className)}
        style={{
          backgroundImage: imageUrl ? `url(${rewriteMediaUrl(imageUrl)})` : undefined,
        }}
      >
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            {getLocalizedValue(heading, language)}
          </Title>

          <Container>
            <Text size="lg" className={classes.description}>
              {getLocalizedValue(subheading, language)}
            </Text>
          </Container>

          
          {ctas && ctas?.length > 0 && (
            <div className={classes.controls}>
              {ctas.map((cta, index) => (
                <Cta 
                  key={index} 
                  label={cta.label} 
                  href={cta.href} 
                  secondary={index !== 0}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

