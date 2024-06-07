import {
  A_TO_Z_LABEL,
  CLOSEST_FIRST_LABEL,
  DISTANCE,
  DROP,
  FURTHEST_FIRST_LABEL,
  HIGHEST_FIRST_LABEL,
  LOWEST_FIRST_LABEL,
  NAME,
  SORT_BY_DEFAULT,
  SORT_ORDER_DEFAULT,
  SORT_ORDER_REVERSED,
  Z_TO_A_LABEL,
} from './baggables.consts'

export type SortByType = typeof SORT_BY_DEFAULT | typeof DROP | typeof NAME | typeof DISTANCE
export type SortOrderType = typeof SORT_ORDER_DEFAULT | typeof SORT_ORDER_REVERSED

export type ToggleCheckedOptionLabel = typeof HIGHEST_FIRST_LABEL | typeof A_TO_Z_LABEL | typeof CLOSEST_FIRST_LABEL
export type ToggleUncheckedOptionLabel = typeof LOWEST_FIRST_LABEL | typeof Z_TO_A_LABEL | typeof FURTHEST_FIRST_LABEL

export type LatLonPoint = {
  latitude: number
  longitude: number
}
