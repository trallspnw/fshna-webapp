const app = process.env.APP_ENV

export function rewriteMediaUrl(url: string) {
  if (app === 'site') {
    return url.replace(/^\/api\/media\/file/, '/media')
  }
  return url
}
