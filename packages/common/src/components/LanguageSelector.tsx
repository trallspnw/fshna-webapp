'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from '@common/types/language'
import { Menu, Button } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

/**
 * Language selector component. The selected language is saved via the useLanguage hook.
 */
export function LanguageSelector() {
  const [selectedLanguage, setLanguage] = useLanguage()

  return (
    <Menu withinPortal>
      <Menu.Target>
        <Button
          variant="subtle"
          rightSection={<IconChevronDown size={16} />}
        >
          {selectedLanguage.toUpperCase()}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {SUPPORTED_LANGUAGES.map((language) => (
          <Menu.Item
            key={language}
            onClick={() => setLanguage(language)}
            disabled={selectedLanguage === language}
          >
            {LANGUAGE_LABELS[language]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
