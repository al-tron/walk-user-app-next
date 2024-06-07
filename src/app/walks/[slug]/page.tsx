import { Metadata, NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { PageRoutes } from '@/consts/routes'
import { BasicPageProps, SlugArrayResponseSchema } from '@/types/types'
import { WalkPageFormattedDataSchema, WalkPageResponseSchema } from '@/features/walks/walks.types'

import { gqlClient } from '@/lib/gqlClient'
import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'
import { formatWalkPageData } from '@/features/walks/utils/formatWalkPageData.util'
import { walkDataBySlugQuery, walkSlugsQuery } from '@/features/walks/walks.graphs'

import { CurveBanner } from '@/components/CurveBanner/CurveBanner'
import { Container } from '@/components/Container/Container'
import { ContentExpander } from '@/components/ContentExpander/ContentExpander'
import { Title } from '@/components/Title/Title'
import { WalkMap } from '@/features/map/components/WalkMap/WalkMap'
import { ElevationProfile } from '@/features/walks/components/ElevationProfile/ElevationProfile'
import { StatsTable } from '@/features/walks/components/StatsTable/StatsTable'

const Walk: NextPage<BasicPageProps> = async ({ params }) => {
  const { siteName } = await getSiteNameAndMetaDescription()

  const {
    slug,
    title,
    date,
    modified,
    content,
    featuredImage,
    featuredImageSizes: { aspect1x1Url, aspect4x3Url, aspect16x9Url },
    shortDescription,
    longDescription,
    altitudeData,
    generalWalkStats,
    walkRouteData: { routeGeoJson },
  } = await getWalkPageData(params.slug)

  return (
    <>
      <CurveBanner image={featuredImage}>
        <Container variants={{ width: 'lg' }} className="py-20">
          <Title level={1} align="center" style="lg" classes="xxs:mx-4 sm:mx-8 -my-8" shadow>
            {title}
          </Title>
        </Container>
      </CurveBanner>

      <Container as="section">
        <Title level={2} align="left" style="sm" classes="mb-2 opacity-70" lightBg>
          OS Map & Walk Data
        </Title>

        <Title level={3} align="left" style="xs" classes="mb-5 max-w-[44rem]" lightBg>
          {shortDescription}
        </Title>

        <div className="mb-9 flex flex-col md:mb-12 lg:flex-row">
          <section className="relative w-full lg:w-3/5">
            <h3 className="sr-only">Ordnance Survey map of this walk</h3>

            <WalkMap routeGeoJson={routeGeoJson} />
          </section>

          <div className="mt-14 w-full lg:mt-0 lg:w-2/5">
            <div className="-mt-9 flex flex-col sm2:flex-row-reverse lg:ml-4 lg:mt-0 lg:flex-col">
              <ElevationProfile altitudeData={altitudeData} />

              <StatsTable walkStatsData={generalWalkStats} />
            </div>
          </div>
        </div>
      </Container>

      <ContentExpander title={title} content={content} description={longDescription} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLd(siteName, title, slug, shortDescription, aspect1x1Url, aspect4x3Url, aspect16x9Url, date, modified),
          ),
        }}
      />
    </>
  )
}

const jsonLd = (
  siteName: string,
  title: string,
  slug: string,
  description: string,
  featuredImage1x1Url: string,
  featuredImage4x3Url: string,
  featuredImage16x9Url: string,
  date?: string,
  modified?: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  url: PageRoutes.WALK_DETAILS.replace('[slug]', slug),
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
  image: [
    {
      '@type': 'ImageObject',
      url: featuredImage1x1Url,
      width: 1200,
      height: 1200,
    },
    {
      '@type': 'ImageObject',
      url: featuredImage4x3Url,
      width: 1300,
      height: 975,
    },
    {
      '@type': 'ImageObject',
      url: featuredImage16x9Url,
      width: 1424,
      height: 801,
    },
  ],
})

const getWalkPageData = async (pageSlug: string) => {
  try {
    const data = await gqlClient(walkDataBySlugQuery, WalkPageResponseSchema, {
      slug: pageSlug,
    })

    return WalkPageFormattedDataSchema.parse(formatWalkPageData(data))
  } catch {
    notFound()
  }
}

export const generateStaticParams = async () => {
  const { walks } = await gqlClient(walkSlugsQuery, SlugArrayResponseSchema)
  return walks.nodes
}

export const generateMetadata = async (
  { params: { slug } }: BasicPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title, shortDescription, slug: slugFromResponse, featuredSocialImageUrl } = await getWalkPageData(slug)

  return {
    title: { absolute: `${title} 🥾` },
    description: shortDescription,
    openGraph: {
      title: title,
      description: `🥾 ${shortDescription}`,
      url: PageRoutes.WALK_DETAILS.replace('[slug]', slugFromResponse),
      siteName: (await parent).openGraph!.siteName,
      images: [
        {
          url: featuredSocialImageUrl,
          width: 1200,
          height: 630,
          type: 'image/jpg',
        },
      ],
      locale: (await parent).openGraph!.locale,
      type: 'article',
    },
    twitter: {
      card: (await parent).twitter!.card,
    } as Metadata['twitter'],
  }
}

export default Walk
