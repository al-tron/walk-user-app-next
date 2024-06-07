import { z } from 'zod'
import { gql } from 'graphql-request'

import { gqlClient } from '../gqlClient'
import { prismaClient } from './prismaClient'

/**
 * MASSIVE WARNING: Code placed here also gets run on every deployment in production and can/will alter data in the
 * production DB. Only modify "static data" tables that never get changed or modified outside of each build process.
 */
const main = async () => {
  // Sync baggable types with walk-content-service.
  await prismaClient.baggableTypes.deleteMany()

  const { baggableTypes } = await gqlClient(baggableTypesQuery, BaggableTypesResponseSchema)

  console.log(baggableTypes.nodes) // eslint-disable-line no-console
}

const baggableTypesQuery = gql`
  query Baggables {
    baggableTypes {
      nodes {
        databaseId
        baggable_type_taxonomy {
          singularName
        }
      }
    }
  }
`

const BaggableTypesResponseSchema = z.object({
  baggableTypes: z.object({
    nodes: z.array(
      z.object({
        databaseId: z.number(),
        baggable_type_taxonomy: z.object({
          singularName: z.string(),
        }),
      }),
    ),
  }),
})

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e) // eslint-disable-line no-console

    await prismaClient.$disconnect()
    process.exit(1)
  })
