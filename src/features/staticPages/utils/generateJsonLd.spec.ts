import { PageRoutes } from '@/consts/routes'

import { generateJsonLd } from './generateJsonLd.util'

describe('generateJsonLd.util', () => {
  it('Should return correct JSON-LD for given args, including correct URL for `TERMS` and date/modified values', () => {
    const EXPECTED_OUTPUT = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Test Page Title',
      url: PageRoutes.TERMS,
      datePublished: '2023-11-05',
      dateModified: '2024-02-23',
      author: [
        {
          '@type': 'Organization',
          name: 'Walk Test',
          url: PageRoutes.HOME,
        },
      ],
      publisher: {
        '@type': 'Organization',
        name: 'Walk Test',
        url: PageRoutes.HOME,
      },
    }

    expect(
      generateJsonLd({
        siteName: 'Walk Test',
        type: 'WebPage',
        title: 'Test Page Title',
        slugConst: 'TERMS',
        date: '2023-11-05',
        modified: '2024-02-23',
      }),
    ).toEqual(EXPECTED_OUTPUT)
  })

  it('Should return correct JSON-LD for given args, including correct URL for `CONTACT` and without date/modified values', () => {
    const EXPECTED_OUTPUT = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Test Contact Title',
      url: PageRoutes.CONTACT,
      author: [
        {
          '@type': 'Organization',
          name: 'Walk Test Again',
          url: PageRoutes.HOME,
        },
      ],
      publisher: {
        '@type': 'Organization',
        name: 'Walk Test Again',
        url: PageRoutes.HOME,
      },
    }

    expect(
      generateJsonLd({
        siteName: 'Walk Test Again',
        type: 'ContactPage',
        title: 'Test Contact Title',
        slugConst: 'CONTACT',
      }),
    ).toEqual(EXPECTED_OUTPUT)
  })
})
