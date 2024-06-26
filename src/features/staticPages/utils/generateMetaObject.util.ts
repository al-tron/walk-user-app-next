import { Metadata, ResolvedMetadata } from 'next'

import { PageRoutes } from '@/consts/routes'
import { StaticPageConstTypes } from '../staticPages.types'

export const generateMetaObject = ({ siteName, title, slugConst, parent }: GenerateMetaObjectParams) => ({
  title: title,
  description: `${siteName} ${title.toLowerCase()} page.`,
  openGraph: {
    url: PageRoutes[slugConst],
    siteName: parent.openGraph?.siteName,
    images: parent.openGraph?.images,
    locale: parent.openGraph?.locale,
  },
  twitter: {
    card: parent.twitter?.card,
  } as Metadata['twitter'],
})

type GenerateMetaObjectParams = {
  siteName: string
  title: string
  slugConst: StaticPageConstTypes
  parent: ResolvedMetadata
}
