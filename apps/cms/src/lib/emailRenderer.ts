import { JSX } from 'react'
export async function renderToHtml(jsx: JSX.Element): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server')
  return renderToStaticMarkup(jsx)
}
