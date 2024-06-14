import PresentationChartBarIcon from '@heroicons/react/24/outline/PresentationChartBarIcon'
import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon'

export const SORT_BY_HEIGHT = 'height' as const
export const SORT_BY_DROP = 'drop' as const
export const SORT_BY_NAME = 'name' as const
export const SORT_BY_DISTANCE = 'distance' as const

export const SORT_ORDER_DEFAULT = 'default' as const
export const SORT_ORDER_REVERSED = 'reversed' as const

export const QUERY_PARAM_NAME = 'query' as const
export const SORT_PARAM_NAME = 'sort' as const
export const ORDER_PARAM_NAME = 'order' as const

export const HIGHEST_FIRST_LABEL = 'Highest first' as const
export const LOWEST_FIRST_LABEL = 'Lowest first' as const
export const A_TO_Z_LABEL = 'A to Z' as const
export const Z_TO_A_LABEL = 'Z to A' as const
export const CLOSEST_FIRST_LABEL = 'Closest first' as const
export const FURTHEST_FIRST_LABEL = 'Furthest first' as const

export const SORT_BY_HEIGHT_ICON = <PresentationChartBarIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
export const SORT_BY_DROP_ICON = (
  <PresentationChartLineIcon className="h-6 w-6 shrink-0 -scale-x-100" aria-hidden="true" />
)
export const SORT_BY_NAME_ICON = <BookOpenIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
export const SORT_BY_DISTANCE_ICON = <MapPinIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
