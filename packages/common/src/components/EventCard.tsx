// Adapted from https://ui.mantine.dev/category/article-cards/

'use client'

import { Card, Group, Text } from '@mantine/core';
import classes from './EventCard.module.scss';
import { DEFAULT_LANGUAGE, Language } from '../types/language';

export type EventCardProps = {
  name: string 
  href: string 
  imageSrc: string 
  date: Date
  locale?: Language
}

export function EventCard({ name, href, imageSrc, date, locale }: EventCardProps) {

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={href}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
            `url(${imageSrc})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {name}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="md" className={classes.date}>
              {date.toLocaleDateString(locale || DEFAULT_LANGUAGE, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}
