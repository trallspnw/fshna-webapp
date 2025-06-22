'use client'

import { useSyncExternalStore, useEffect } from 'react'
import { languageStore } from '@common/lib/languageStore'
import { Language } from '@common/types/language'

export function useLanguage(): [Language, (lang: Language) => void] {
  useEffect(() => {
    languageStore.init()
  }, [])

  const language = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    () => languageStore.getSnapshot(),
  )

  return [language, languageStore.setLanguage]
}
