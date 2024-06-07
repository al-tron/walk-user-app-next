import { z } from 'zod'

import {
  BasicPageResponseSchema,
  ImageDataSchema,
  ImageResponseSchema,
  LatSchema,
  LngSchema,
  GeoJsonSchema,
} from '@/types/types'
import {
  digitalWatchTimeFormatMatcher,
  formattedWalkingTimeMatcher,
  osGridRefMatcher,
  urlSlugMatcher,
} from '@/types/regex'

const OsGridSchema = z.string().regex(osGridRefMatcher)

const WalkRouteDataCommon = {
  startGridRef: OsGridSchema,
  startLatitude: LatSchema,
  startLongitude: LngSchema,
  endGridRef: OsGridSchema,
  endLatitude: LatSchema,
  endLongitude: LngSchema,
}

export const WalkPageResponseSchema = z.object({
  walk: BasicPageResponseSchema.extend({
    slug: z.string().regex(urlSlugMatcher),
    walk_data: z.object({
      shortDescription: z.string(),
      longDescription: z.string(),
      maxAltitude: z.number(),
      minAltitude: z.number(),
      totalAscent: z.number().min(0),
      distance: z.number().min(0),
      time: z.string().regex(digitalWatchTimeFormatMatcher),
      difficulty: z.enum(['Very Easy', 'Easy', 'Medium', 'Challanging', 'Epic']),
      terrain: z.enum(['Very Smooth', 'Smooth', 'Moderate', 'Rough']),
      area: z.string(),
      distEleRoute: z.string(),
      latLonRoute: z.string(),
      ...WalkRouteDataCommon,
    }),
    featuredImage: ImageResponseSchema,
  }),
})

export type WalkPageResponseType = z.infer<typeof WalkPageResponseSchema>

const WalkAltitudeSchema = z.object({
  distanceElevation: z.array(
    z.object({
      distance: z.number().min(0),
      elevation: z.number().min(0),
    }),
  ),
  maxAltitude: z.number(),
  minAltitude: z.number(),
  totalAscent: z.number().min(0),
})

export type AltitudeDataType = z.infer<typeof WalkAltitudeSchema>

const WalkStatsSchema = z.object({
  distance: z.number().min(0),
  time: z.string().regex(formattedWalkingTimeMatcher),
  difficulty: z.enum(['Very Easy', 'Easy', 'Medium', 'Challanging', 'Epic']),
  terrain: z.enum(['Very Smooth', 'Smooth', 'Moderate', 'Rough']),
  area: z.string(),
})

export type WalkStatsType = z.infer<typeof WalkStatsSchema>

export const WalkPageFormattedDataSchema = BasicPageResponseSchema.extend({
  slug: z.string().regex(urlSlugMatcher),
  featuredImage: ImageDataSchema,
  featuredImageSizes: z.object({
    aspect1x1Url: z.string(),
    aspect4x3Url: z.string(),
    aspect16x9Url: z.string(),
  }),
  featuredSocialImageUrl: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  altitudeData: WalkAltitudeSchema,
  generalWalkStats: WalkStatsSchema,
  walkRouteData: z.object({
    routeGeoJson: GeoJsonSchema,
    ...WalkRouteDataCommon,
  }),
})

export type WalkPageFormattedDataType = {
  walk: z.infer<typeof WalkPageFormattedDataSchema>
}

export const WalkCardsResponseSchema = z.object({
  walks: z.object({
    nodes: z.array(
      z.object({
        slug: z.string().regex(urlSlugMatcher),
        title: z.string(),
        walk_data: z.object({
          shortDescription: z.string(),
          difficulty: z.string(),
          distance: z.number(),
          time: z.string(),
        }),
        featuredImage: ImageResponseSchema,
      }),
    ),
  }),
})

export type WalkCardsResponseType = z.infer<typeof WalkCardsResponseSchema>

export const WalkCardFormattedSchema = z.object({
  slug: z.string().regex(urlSlugMatcher),
  title: z.string(),
  shortDescription: z.string(),
  difficulty: z.string(),
  distance: z.number(),
  time: z.string().regex(formattedWalkingTimeMatcher),
  featuredImage: ImageDataSchema,
})

export type WalkCardFormattedDataType = z.infer<typeof WalkCardFormattedSchema>

export const WalkCardsFormattedArraySchema = z.array(WalkCardFormattedSchema)
