import { Language, LocalizedMedia } from "../types/language"
import { Media } from "../types/payload-types"

const app = process.env.APP_ENV

/**
 * The static site does not fetch media from an API once built. Media is addressed directly from a static media location.
 * @param url A payload CMS generated url string
 * @returns A media URL usable by the current environment
 */
export function rewriteMediaUrl(url: string) {
  if (app === 'site') {
    return url.replace(/^\/api\/mediaFiles\/file/, '/mediaFiles')
  }
  return url
}

/**
 * Converts layload generated mdia types to LocalizedMedia. This app doesn't use numbers to represent media.
 * @param media Payload generated media
 * @returns LocalizedMedia
 */
export function normalizeMedia(media: number | Media | null | undefined) {
  if (!media || typeof media === 'number') {
    return {}
  }

  const result: LocalizedMedia = {}

  for (const language of Object.keys(media.media ?? {}) as Language[]) {
    const file = media.media?.[language]
    const alt = media.altText?.[language] ?? null

    if (file && typeof file !== 'number') {
      result[language] = {
        file: file,
        url: file.url ?? '',
        alt: alt || undefined,
      }
    } else {
      result[language] = null
    }
  }

  return result
}
