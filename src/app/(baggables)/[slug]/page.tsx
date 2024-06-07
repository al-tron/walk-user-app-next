import { Suspense } from 'react'

import { NextPage } from 'next'
import { notFound } from 'next/navigation'

import { z } from 'zod'

import {
  HIGHEST_FIRST_LABEL,
  SORT_BY_DEFAULT,
  SORT_BY_DEFAULT_ICON,
  SORT_ORDER_DEFAULT,
} from '@/features/baggables/baggables.consts'
import { LatSchema, LngSchema, BasicPageProps, SlugArrayResponseSchema } from '@/types/types'
import { urlSlugMatcher } from '@/types/regex'

import { gqlClient } from '@/lib/gqlClient'
import { baggablesListBySlugQuery, baggableTypesSlugsQuery } from '@/features/baggables/baggables.graphs'

import { CurveBanner } from '@/components/CurveBanner/CurveBanner'
import { Container } from '@/components/Container/Container'
import { Title } from '@/components/Title/Title'
import { BaggablesFiltersUi } from '@/features/baggables/components/BaggablesFilters/BaggablesFiltersUi'
import { BaggablesFiltersWrapper } from '@/features/baggables/components/BaggablesFilters/BaggablesFiltersWrapper'
import { BaggablesListUi } from '@/features/baggables/components/BaggablesList/BaggablesListUi'
import { BaggablesListWrapper } from '@/features/baggables/components/BaggablesList/BaggablesListWrapper'

const BaggablesIndex: NextPage<BasicPageProps> = async ({ params }) => {
  const { pageTitle, pageDescription, baggableTypeName, baggableTypeSlug, listData, count } =
    await getBaggablesListData(params.slug)

  return (
    <>
      <CurveBanner>
        <Container as="section" variants={{ width: 'md' }}>
          <Title level={1} align="center" style="xl">
            {pageTitle}
          </Title>

          <div
            className="c-content-area c-content-area--dark-bg -mb-5 mt-8 text-center xs2:-mb-4 sm:-mb-2"
            dangerouslySetInnerHTML={{ __html: pageDescription }}
          />
        </Container>
      </CurveBanner>

      <Container variants={{ marginBottom: true }}>
        <div className="mb-2 flex items-baseline justify-between">
          <Title level={2} align="left" classes="opacity-70" lightBg style="sm">
            {`${baggableTypeName} List`}
          </Title>

          {/* Gets updated on the client by direct DOM manipulation in the `BaggablesListWrapper` child component. */}
          <span className="text-xs text-gray-600 dark:text-slate-300 md:text-sm">
            <strong id="filtered-list-count">{count}</strong>
            {` ${baggableTypeName}`}
          </span>
        </div>

        <Suspense
          fallback={
            <BaggablesFiltersUi
              baggableTypeName={baggableTypeName}
              sortBy={SORT_BY_DEFAULT}
              sortOrder={SORT_ORDER_DEFAULT}
              sortByIcon={SORT_BY_DEFAULT_ICON}
              toggleCheckedOptionLabel={HIGHEST_FIRST_LABEL}
              disabled
            />
          }
        >
          <BaggablesFiltersWrapper baggableTypeName={baggableTypeName} />
        </Suspense>

        <Suspense
          fallback={
            <BaggablesListUi
              baggablesList={listData}
              baggableTypeSlug={baggableTypeSlug}
              baggableTypeName={baggableTypeName}
            />
          }
        >
          <BaggablesListWrapper
            staticBaggablesList={listData}
            baggableTypeSlug={baggableTypeSlug}
            baggableTypeName={baggableTypeName}
          />
        </Suspense>
      </Container>
    </>
  )
}

const getBaggablesListData = async (slug: string) => {
  try {
    const { baggableType } = await gqlClient(baggablesListBySlugQuery, BaggablesListResponseDataSchema, {
      slug: slug,
    })

    const formattedBaggablesListData = baggableType.contentNodes.nodes.map((baggable) => ({
      name: baggable.title,
      slug: baggable.slug,
      height: baggable.baggables.height,
      drop: baggable.baggables.drop,
      latitude: baggable.baggables.latitude,
      longitude: baggable.baggables.longitude,
    }))

    return {
      pageTitle: baggableType.baggable_type_taxonomy.pageTitle,
      pageDescription: baggableType.baggable_type_taxonomy.pageDescription,
      baggableTypeName: baggableType.name,
      baggableTypeSlug: baggableType.slug,
      count: baggableType.count,
      listData: formattedBaggablesListData,
    }
  } catch {
    notFound()
  }
}

export const generateStaticParams = async () => {
  const { baggableTypes } = await gqlClient(baggableTypesSlugsQuery, SlugArrayResponseSchema)
  return baggableTypes.nodes
}

const BaggablesListResponseDataSchema = z.object({
  baggableType: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    count: z.number(),
    baggable_type_taxonomy: z.object({
      pageTitle: z.string(),
      pageDescription: z.string(),
    }),
    contentNodes: z.object({
      nodes: z.array(
        z.object({
          slug: z.string().regex(urlSlugMatcher),
          title: z.string(),
          baggables: z.object({
            height: z.number(),
            drop: z.number(),
            latitude: LatSchema,
            longitude: LngSchema,
          }),
        }),
      ),
    }),
  }),
})

export default BaggablesIndex
