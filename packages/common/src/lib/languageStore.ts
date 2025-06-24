import { Language, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@common/types/language'

const STORAGE_KEY = 'language'

let current: Language = DEFAULT_LANGUAGE
const listeners = new Set<() => void>()

function getSnapshot(): Language {
  return current ?? resolvePreferredLanguage()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function setLanguage(language: Language) {
  current = language
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, language)
  }
  listeners.forEach(handle => handle())
}

function init() {
  current = resolvePreferredLanguage()
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, current)
  }
}

function resolvePreferredLanguage(): Language {
  // If no window
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  // Get from local storage
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored

  // Get from browser
  for (const language of navigator.languages ?? []) {
    const base = language.toLowerCase().split('-')[0] as Language
    if (SUPPORTED_LANGUAGES.includes(base)) return base
  }

  // Default
  return DEFAULT_LANGUAGE
}

export const languageStore = {
  getSnapshot,
  subscribe,
  setLanguage,
  init,
}
