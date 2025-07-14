import { Language, LocalizedMedia } from "../types/language"
import { Media } from "../types/payload-types"

const app = process.env.APP_ENV

export function rewriteMediaUrl(url: string) {
  if (app === 'site') {
    return url.replace(/^\/api\/mediaFiles\/file/, '/mediaFiles')
  }
  return url
}

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
