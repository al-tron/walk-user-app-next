import { existsSync, mkdirSync, writeFileSync } from 'fs'

import { gql } from 'graphql-request'
import { z } from 'zod'

import { urlSlugMatcher } from '@/types/regex'
import { gqlClient } from '@/lib/gqlClient'

const generateBuildTimeStaticData = async () => {
  const data = await gqlClient(buildTimeStaticDataQuery, BuildTimeStaticDataSchema)

  const unescapeApostrophes = (string: string) => string.replaceAll('&#039;', "'")
  const siteName = unescapeApostrophes(data.generalSettings.title)

  const staticData = {
    siteName: siteName,
    baggablesLinks:
      data.baggableTypes.nodes.map((baggableType) => ({
        label: baggableType.baggable_type_taxonomy.pageTitle,
        slug: baggableType.slug,
      })) || [],
  }

  if (!existsSync('./.buildTimeStaticData')) {
    mkdirSync('./.buildTimeStaticData')
  }

  writeFileSync('./.buildTimeStaticData/manifest.json', JSON.stringify(staticData))
}

const buildTimeStaticDataQuery = gql`
  query buildTimeStaticData {
    generalSettings {
      title
    }
    baggableTypes {
      nodes {
        slug
        baggable_type_taxonomy {
          pageTitle
        }
      }
    }
  }
`

const BuildTimeStaticDataSchema = z.object({
  generalSettings: z.object({
    title: z.string(),
  }),
  baggableTypes: z.object({
    nodes: z.union([
      z.array(
        z.object({
          slug: z.string().regex(urlSlugMatcher),
          baggable_type_taxonomy: z.object({
            pageTitle: z.string(),
          }),
        }),
      ),
      z.tuple([]),
    ]),
  }),
})

generateBuildTimeStaticData().catch((error) => {
  console.error(error) // eslint-disable-line no-console
  process.exit(1)
})
