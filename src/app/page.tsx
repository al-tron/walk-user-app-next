import { NextPage } from 'next'

import { PageRoutes } from '@/consts/routes'

import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'

import { Title } from '@/components/Title/Title'
import { CurveBanner } from '@/components/CurveBanner/CurveBanner'
import { Container } from '@/components/Container/Container'
import { WalkCardsScroller } from '@/features/walks/components/WalkCardsScroller/WalkCardsScroller'

const { NEXT_PUBLIC_FRONTEND_URL, APP_REGION } = process.env

const Home: NextPage = async () => {
  const { siteName } = await getSiteNameAndMetaDescription()

  return (
    <>
      <CurveBanner>
        <Container as="section">
          <Title level={1} align="center" style="md">
            Discover your next
            <span className="block lg:inline"> {APP_REGION} adventure</span>
          </Title>

          <Title level={2} align="center" style="line" classes="mt-3 max-w-sm">
            Recent Walks
          </Title>
        </Container>

        <WalkCardsScroller />
      </CurveBanner>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(siteName)) }} />
    </>
  )
}

const jsonLd = (siteName: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: PageRoutes.HOME,
  logo: `${NEXT_PUBLIC_FRONTEND_URL}/favicons/maskable-icon-512.webp`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'All Enquiries',
    url: PageRoutes.CONTACT,
  },
})

export default Home
