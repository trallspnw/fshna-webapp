import { JSX } from 'react'

/**
 * Converts a JSX element to HTML. Uses renderToStaticMarket wich has limited support for state and other react features.
 * Must be used with supported blocks only.
 * @param jsx A JSX element
 * @returns Rendered HTML.
 */
export async function renderToHtml(jsx: JSX.Element): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server')
  return renderToStaticMarkup(jsx)
}
