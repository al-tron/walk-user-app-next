import { z } from 'zod'
import { gql } from 'graphql-request'

import { BaggablesGeoDataResponseSchema } from '@/features/baggables/baggables.types'

import { gqlClient } from '../gqlClient'
import { prismaClient } from './prismaClient'

/**
 * MASSIVE WARNING: Code placed here also gets run on every deployment in production and can/will alter data in the
 * production DB. Only modify "static data" tables that never get changed or modified outside of each build process.
 */
const main = async () => {
  const { baggableTypes, baggables } = await gqlClient(
    baggableTypesAndBaggablesQuery,
    BaggableTypesAndBaggablesResponseSchema,
  )

  // Sync baggable types from walk-content-service-mysql with walk-user-app-postgres.
  await prismaClient.baggableTypes.deleteMany()

  await prismaClient.baggableTypes.createMany({
    data: baggableTypes.nodes.map((baggableType) => ({
      id: baggableType.databaseId,
      type: baggableType.baggable_type_taxonomy.singularName,
    })),
  })

  // Sync baggables from walk-content-service-mysql with walk-user-app-postgres.
  await prismaClient.baggables.deleteMany()

  await Promise.all(
    baggables.nodes.map(async (baggable) => {
      await prismaClient.baggables.create({
        data: {
          id: baggable.databaseId,
          name: baggable.title,
          slug: baggable.slug,
          height: baggable.baggables.height,
          drop: baggable.baggables.drop,
          latitude: baggable.baggables.latitude,
          longitude: baggable.baggables.longitude,
          baggableTypes: {
            connect: baggable.baggableTypes.nodes.map((baggableType) => ({
              id: baggableType.databaseId,
            })),
          },
        },
      })
    }),
  )
}

const baggableTypesAndBaggablesQuery = gql`
  query BaggableTypesAndBaggables {
    baggableTypes {
      nodes {
        databaseId
        baggable_type_taxonomy {
          singularName
        }
      }
    }
    baggables(first: 508) {
      nodes {
        databaseId
        title
        slug
        baggableTypes {
          nodes {
            databaseId
          }
        }
        baggables {
          height
          drop
          latitude
          longitude
        }
      }
    }
  }
`

const BaggableTypesAndBaggablesResponseSchema = z.object({
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
  baggables: z.object({
    nodes: z.array(
      z.object({
        databaseId: z.number(),
        title: z.string(),
        slug: z.string(),
        baggableTypes: z.object({
          nodes: z.array(
            z.object({
              databaseId: z.number(),
            }),
          ),
        }),
        baggables: BaggablesGeoDataResponseSchema,
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
