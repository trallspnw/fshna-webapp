'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS } from '@common/types/language'

export function LanguageSelector() {
  const [selectedLanguage, setLanguage] = useLanguage()

  // Temp proof of concept layout
  return (
    <div>
      {SUPPORTED_LANGUAGES.map((language) => (
        <button
          key={language}
          onClick={() => {
            setLanguage(language)
          }}
          disabled={selectedLanguage === language}
        >
          {LANGUAGE_LABELS[language]}
        </button>
      ))}
    </div>
  )
}
