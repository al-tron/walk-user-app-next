import { ResolvedMetadata } from 'next'

import { PageRoutes } from '@/consts/routes'

import { generateMetaObject } from './generateMetaObject.util'

const PARENT_METADATA_MOCK = {
  openGraph: {
    siteName: 'Parent Site Name',
    images: [{ url: 'image-url' }],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
  },
} as ResolvedMetadata

describe('generateMetaObject.util', () => {
  it('Should generate correct meta object with openGraph and twitter information from parent', () => {
    const EXPECTED_OUTPUT = {
      title: 'Page Title',
      description: 'Walk Test page title page.',
      openGraph: {
        url: PageRoutes.TERMS,
        siteName: 'Parent Site Name',
        images: [{ url: 'image-url' }],
        locale: 'en_GB',
      },
      twitter: {
        card: 'summary',
      },
    }

    expect(
      generateMetaObject({
        siteName: 'Walk Test',
        title: 'Page Title',
        slugConst: 'TERMS',
        parent: PARENT_METADATA_MOCK,
      }),
    ).toEqual(EXPECTED_OUTPUT)
  })
})
