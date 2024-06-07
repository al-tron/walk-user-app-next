import { PageRoutes } from '@/consts/routes'
import { StaticPageConstTypes } from '../staticPages.types'

export const generateJsonLd = (
  siteName: string,
  type: 'WebPage' | 'ContactPage',
  title: string,
  slugConst: StaticPageConstTypes,
  date?: string,
  modified?: string,
) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name: title,
  url: PageRoutes[slugConst],
  datePublished: date,
  dateModified: modified,
  author: [
    {
      '@type': 'Organization',
      name: siteName,
      url: PageRoutes.HOME,
    },
  ],
  publisher: {
    '@type': 'Organization',
    name: siteName,
    url: PageRoutes.HOME,
  },
})
