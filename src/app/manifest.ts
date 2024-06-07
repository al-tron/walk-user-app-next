import { MetadataRoute } from 'next'

import { PageRoutes } from '@/consts/routes'

import manifestStaticData from '@buildTimeStaticData/manifest.json'
const { siteName, baggablesLinks } = manifestStaticData

const THEME_COLOR = '#2c4c31'

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: siteName,
    short_name: siteName,
    theme_color: THEME_COLOR,
    background_color: THEME_COLOR,
    start_url: '/',
    display: 'standalone',
    shortcuts: baggablesLinks.map(({ label, slug }) => ({
      name: label,
      url: PageRoutes.BAGGABLES_LIST.replace('[baggableTypeSlug]', slug),
    })),
    icons: [
      {
        src: '/favicons/icon-light.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}

export default manifest
