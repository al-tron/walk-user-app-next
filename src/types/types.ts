/* istanbul ignore file */

import { z } from 'zod'

export type BasicPageProps = {
  params: { slug: string }
}

export type BasicWrapperProps = {
  children: React.ReactElement
}

export type DarkLight = 'dark' | 'light'
export type SystemLightDark = DarkLight | 'init'
export type ThemeOptions = DarkLight | 'default'

export const SlugArrayResponseSchema = z.record(
  z.object({
    nodes: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
)

export const BasicPageResponseSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  modified: z.string().optional(),
  content: z.string(),
})

export type BasicPageResponseType = z.infer<typeof BasicPageResponseSchema>

export const ImageResponseSchema = z.object({
  node: z.object({
    mediaDetails: z.object({
      sizes: z.array(
        z.object({
          sourceUrl: z.string(),
          name: z.string(),
        }),
      ),
    }),
    altText: z.string(),
    dataUrl: z.string(),
  }),
})

export const ImageDataSchema = z.object({
  url: z.string(),
  dataUrl: z.string(),
  alt: z.string(),
})

export type ImageDataType = z.infer<typeof ImageDataSchema>

export const LatSchema = z.number().min(-90).max(90)
export const LngSchema = z.number().min(-180).max(180)

export const GeoJsonSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(
    z.union([
      z.object({
        type: z.literal('Feature'),
        geometry: z.object({
          type: z.enum(['LineString']),
          coordinates: z.array(z.tuple([LngSchema, LatSchema])),
        }),
      }),
      z.object({
        type: z.literal('Feature'),
        properties: z.object({
          name: z.union([z.literal('start'), z.literal('end')]),
        }),
        geometry: z.object({
          type: z.enum(['Point']),
          coordinates: z.tuple([LngSchema, LatSchema]),
        }),
      }),
    ]),
  ),
})

export type GeoJsonType = z.infer<typeof GeoJsonSchema>
