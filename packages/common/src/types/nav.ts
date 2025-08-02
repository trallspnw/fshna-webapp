import { LocalizedText } from "@common/types/language"

/**
 * Renderable navigation item including localized text and href.
 */
export type NavItem = {
  href: string
  label: LocalizedText
}
