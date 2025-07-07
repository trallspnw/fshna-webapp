// Adapted from https://ui.mantine.dev/category/footers/

'use client'

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconBrandBluesky,
} from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './Footer.module.scss';
import { LocalizedText } from '../types/language';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedValue } from '../lib/translation';
import clsx from 'clsx';
import type { JSX } from 'react';

type SocialChannel = 'facebook' | 'instagram' | 'x' | 'youtube' | 'bluesky';

type LinkGroup = {
  title: string;
  links: {
    href: string;
    label: LocalizedText;
  }[];
};

type FooterProps = {
  linkGroups: LinkGroup[];
  description: string;
  socialLinks?: Partial<Record<SocialChannel, string>>;
  className?: string;
};

const iconProps = {
  size: 18,
  stroke: 1.5,
}

const iconMap: Record<SocialChannel, JSX.Element> = {
  facebook: <IconBrandFacebook {... iconProps} />,
  instagram: <IconBrandInstagram  {... iconProps} />,
  x: <IconBrandX {... iconProps} />,
  youtube: <IconBrandYoutube {... iconProps} />,
  bluesky: <IconBrandBluesky {... iconProps} />,
};

export function Footer({ linkGroups, description, socialLinks = {}, className }: FooterProps) {
  const [language] = useLanguage();

  const groups = linkGroups.map((group, lgIndex) => (
    <div className={classes.wrapper} key={`lg-${lgIndex}`}>
      <Text className={classes.title}>{group.title}</Text>
      {group.links.map((link, lIndex) => (
        <Text<'a'>
          key={`l-${lIndex}`}
          className={classes.link}
          component="a"
          href={link.href}
        >
          {getLocalizedValue(link.label, language)}
        </Text>
      ))}
    </div>
  ));

  return (
    <footer className={clsx(classes.footer, className)}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          LOGO
          <Text size="xs" c="dimmed" className={classes.description}>
            {description}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>

      {Object.keys(socialLinks).length > 0 && (
        <Container className={classes.socials}>
          <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            {Object.entries(socialLinks).map(([channel, href], index) => (
              <ActionIcon
                key={`social-${index}`}
                size="lg"
                color="gray"
                variant="subtle"
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={channel}
              >
                {iconMap[channel as SocialChannel]}
              </ActionIcon>
            ))}
          </Group>
        </Container>
      )}
    </footer>
  );
}
