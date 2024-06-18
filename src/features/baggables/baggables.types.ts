import { z } from 'zod'

import {
  A_TO_Z_LABEL,
  CLOSEST_FIRST_LABEL,
  SORT_BY_DISTANCE,
  SORT_BY_DROP,
  FURTHEST_FIRST_LABEL,
  HIGHEST_FIRST_LABEL,
  LOWEST_FIRST_LABEL,
  SORT_BY_NAME,
  SORT_BY_HEIGHT,
  SORT_ORDER_DEFAULT,
  SORT_ORDER_REVERSED,
  Z_TO_A_LABEL,
} from './baggables.consts'
import { LatSchema, LngSchema } from '@/types/types'

export type SortByType = typeof SORT_BY_HEIGHT | typeof SORT_BY_DROP | typeof SORT_BY_NAME | typeof SORT_BY_DISTANCE
export type SortOrderType = typeof SORT_ORDER_DEFAULT | typeof SORT_ORDER_REVERSED

export type ToggleCheckedOptionLabel = typeof HIGHEST_FIRST_LABEL | typeof A_TO_Z_LABEL | typeof CLOSEST_FIRST_LABEL
export type ToggleUncheckedOptionLabel = typeof LOWEST_FIRST_LABEL | typeof Z_TO_A_LABEL | typeof FURTHEST_FIRST_LABEL

export type LatLonPoint = {
  latitude: number
  longitude: number
}

export type BaggableListItem = {
  name: string
  slug: string
  height: number
  drop: number
  latitude: number
  longitude: number
}

export type BaggableListItemMaybeWithRelativePosition = BaggableListItem & {
  distanceFromUser?: number
  bearingFromUser?: number
}

export type BaggableListItemWithRelativePosition = BaggableListItem & {
  distanceFromUser: number
  bearingFromUser: number
}

export const BaggablesGeoDataResponseSchema = z.object({
  height: z.number(),
  drop: z.number(),
  latitude: LatSchema,
  longitude: LngSchema,
})
