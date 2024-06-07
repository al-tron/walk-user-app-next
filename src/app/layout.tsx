import { Metadata, Viewport } from 'next'

import { PageRoutes } from '@/consts/routes'
import { BasicWrapperProps } from '@/types/types'

import { SettingsContextProvider } from '@/context/useSettings.context'
import { DarkModeContextProvider } from '@/context/useDarkMode.context'
import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'

import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

import '../styles/global.css'

const { APP_LOCALE, APP_REGION, THE_APP_REGION, NEXT_PUBLIC_FRONTEND_URL } = process.env

const RootLayout = async ({ children }: BasicWrapperProps) => {
  return (
    <SettingsContextProvider>
      <DarkModeContextProvider>
        <html lang={APP_LOCALE}>
          <body className="bg-gray-50 dark:bg-gray-800">
            {/* div required so that headlessui Popover component closes on click outside */}
            <div>
              <Header />

              <main>{children}</main>

              <Footer />
            </div>
          </body>
        </html>
      </DarkModeContextProvider>
    </SettingsContextProvider>
  )
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { siteName, metaDescription } = await getSiteNameAndMetaDescription()

  return {
    metadataBase: new URL(String(NEXT_PUBLIC_FRONTEND_URL)),
    title: {
      default: `${THE_APP_REGION} | Discover Your Next Adventure | ${siteName}`,
      template: `%s | ${siteName}`,
    },
    description: metaDescription,
    applicationName: siteName,
    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: 'black-translucent',
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: '/favicons/icon-with-dark-mode.svg',
      apple: '/favicons/apple-touch-icon.png',
    },
    openGraph: {
      title: `Discover Your Next ${APP_REGION} Adventure!`,
      description: '❤️ Lovingly crafted walk guides with photos and maps.',
      url: PageRoutes.HOME,
      siteName: siteName,
      images: [
        {
          url: 'img/meta/og-card-logo.png',
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
      locale: APP_LOCALE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#2c4c31',
}

export default RootLayout
