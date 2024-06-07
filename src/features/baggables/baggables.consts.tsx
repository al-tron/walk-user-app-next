import PresentationChartBarIcon from '@heroicons/react/24/outline/PresentationChartBarIcon'
import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon'

export const SORT_BY_DEFAULT = 'height'
export const DROP = 'drop'
export const NAME = 'name'
export const DISTANCE = 'distance'

export const SORT_ORDER_DEFAULT = 'default'
export const SORT_ORDER_REVERSED = 'reversed'

export const QUERY_PARAM_NAME = 'query'
export const SORT_PARAM_NAME = 'sort'
export const ORDER_PARAM_NAME = 'order'

export const HIGHEST_FIRST_LABEL = 'Highest first'
export const LOWEST_FIRST_LABEL = 'Lowest first'
export const A_TO_Z_LABEL = 'A to Z'
export const Z_TO_A_LABEL = 'Z to A'
export const CLOSEST_FIRST_LABEL = 'Closest first'
export const FURTHEST_FIRST_LABEL = 'Furthest first'

export const SORT_BY_DEFAULT_ICON = <PresentationChartBarIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
export const SORT_BY_DROP_ICON = (
  <PresentationChartLineIcon className="h-6 w-6 shrink-0 -scale-x-100" aria-hidden="true" />
)
export const SORT_BY_NAME_ICON = <BookOpenIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
export const SORT_BY_DISTANCE = <MapPinIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
