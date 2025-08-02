import { Language, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@common/types/language'

const STORAGE_KEY = 'language'

let current: Language = DEFAULT_LANGUAGE
const listeners = new Set<() => void>()

/**
 * Get snapshot of the current language.
 * @returns The current language
 */
function getSnapshot(): Language {
  return current ?? resolvePreferredLanguage()
}

/**
 * Subscribes a listener for language change events.
 * @param listener Listener to recieve language change events
 * @returns A function for removing the listener
 */
function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * Saves the language in local storage adn notifies listeners.
 * @param language The language to set
 */
function setLanguage(language: Language) {
  current = language
  // Local storage is not used if there is no window (rendering on server)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, language)
  }
  listeners.forEach(handle => handle())
}

/**
 * Inits the language store.
 */
function init() {
  current = resolvePreferredLanguage()
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, current)
  }
}

/**
 * Resolves the current preferred language. Goes to default if there's no window (running on server), or returns the 
 * language from local storage or browser settings.
 * @returns 
 */
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
