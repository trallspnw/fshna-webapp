import renderHomepage from '@ui/routes/page'
import { SitePageFetcher } from '@site/lib/SitePageFetcher'

export default function SiteHomePage() {
  return renderHomepage({ fetcher: new SitePageFetcher() })
}
