import { Language, DEFAULT_LANGUAGE } from '@common/types/language'

const STORAGE_KEY = 'language'

let current: Language = DEFAULT_LANGUAGE
const listeners = new Set<() => void>()

function getSnapshot(): Language {
  return typeof window === 'undefined' ? DEFAULT_LANGUAGE : current
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
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored) current = stored
  }
}

export const languageStore = {
  getSnapshot,
  subscribe,
  setLanguage,
  init,
}
