'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import {
  A_TO_Z_LABEL,
  CLOSEST_FIRST_LABEL,
  DISTANCE,
  DROP,
  FURTHEST_FIRST_LABEL,
  HIGHEST_FIRST_LABEL,
  LOWEST_FIRST_LABEL,
  NAME,
  ORDER_PARAM_NAME,
  QUERY_PARAM_NAME,
  SORT_BY_DEFAULT,
  SORT_BY_DEFAULT_ICON,
  SORT_BY_DISTANCE,
  SORT_BY_DROP_ICON,
  SORT_BY_NAME_ICON,
  SORT_ORDER_DEFAULT,
  SORT_ORDER_REVERSED,
  SORT_PARAM_NAME,
  Z_TO_A_LABEL,
} from '../../baggables.consts'
import { ToggleCheckedOptionLabel, SortByType, SortOrderType, ToggleUncheckedOptionLabel } from '../../baggables.types'

import { useLocation } from '@/hooks/useLocation.hook'
import { capitaliseWords } from '@/utils/capitaliseWords.util'

import { BaggablesFiltersUi } from './BaggablesFiltersUi'

const SORT_BY_ICONS = {
  [SORT_BY_DEFAULT]: SORT_BY_DEFAULT_ICON,
  [DROP]: SORT_BY_DROP_ICON,
  [NAME]: SORT_BY_NAME_ICON,
  [DISTANCE]: SORT_BY_DISTANCE,
}

/**
 * @docs/wrapperUiPattern
 * This component provides client functionality to the adjacent UI component. This is so that a non-functional,
 * disabled or static version of the component can be used as a pre-rendered server component in the `fallback` prop of
 * a `Suspense` boundary to act as a loading skeleton, whilst the client side aspects of the component are loading.
 */
export const BaggablesFiltersWrapper = ({ baggableTypeName }: { baggableTypeName: string }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const { hasGeoCapabilities } = useLocation()

  const searchTerm = searchParams.get(QUERY_PARAM_NAME)?.toString() || ''
  const sortBy = (searchParams.get(SORT_PARAM_NAME)?.toString() as SortByType) || SORT_BY_DEFAULT
  const sortOrder = (searchParams.get(ORDER_PARAM_NAME)?.toString() as SortOrderType) || SORT_ORDER_DEFAULT

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set(QUERY_PARAM_NAME, term)
    } else {
      params.delete(QUERY_PARAM_NAME)
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSortByAndOrder = (
    paramToSet: typeof SORT_PARAM_NAME | typeof ORDER_PARAM_NAME,
    fieldValue: SortByType | SortOrderType,
    defaultFieldValue: typeof SORT_BY_DEFAULT | typeof SORT_ORDER_DEFAULT,
  ) => {
    const params = new URLSearchParams(searchParams)

    if (fieldValue && fieldValue !== defaultFieldValue) {
      params.set(paramToSet, fieldValue)
    } else {
      params.delete(paramToSet)
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleClearTextInput = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(QUERY_PARAM_NAME)
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const selectBoxOptions = () => {
    const defaultOptions = [
      { name: capitaliseWords(SORT_BY_DEFAULT), value: SORT_BY_DEFAULT },
      { name: capitaliseWords(DROP), value: DROP },
      { name: capitaliseWords(NAME), value: NAME },
    ]

    if (hasGeoCapabilities) {
      return [...defaultOptions, { name: 'Distance from your location', value: DISTANCE }]
    }

    return defaultOptions
  }

  return (
    <BaggablesFiltersUi
      baggableTypeName={baggableTypeName}
      searchTerm={searchTerm}
      sortBy={sortBy}
      sortOrder={sortOrder}
      sortByIcon={SORT_BY_ICONS[sortBy]}
      selectBoxOptions={selectBoxOptions()}
      toggleCheckedOptionLabel={getOptionLabelBySortBy(sortBy, true) as ToggleCheckedOptionLabel}
      toggleUncheckedOptionLabel={getOptionLabelBySortBy(sortBy, false) as ToggleUncheckedOptionLabel}
      handleSearch={(event) => {
        handleSearch(event)
      }}
      handleSortBy={(event) => {
        handleSortByAndOrder(SORT_PARAM_NAME, event as SortByType, SORT_BY_DEFAULT)
      }}
      handleListOrder={() => {
        if (sortOrder === SORT_ORDER_DEFAULT) {
          handleSortByAndOrder(ORDER_PARAM_NAME, SORT_ORDER_REVERSED, SORT_ORDER_DEFAULT)
        } else if (sortOrder === SORT_ORDER_REVERSED) {
          handleSortByAndOrder(ORDER_PARAM_NAME, SORT_ORDER_DEFAULT, SORT_ORDER_DEFAULT)
        }
      }}
      handleClearInput={handleClearTextInput}
    />
  )
}

const getOptionLabelBySortBy = (sortBy: SortByType, isChecked: boolean) => {
  switch (sortBy) {
    case SORT_BY_DEFAULT:
      return isChecked ? HIGHEST_FIRST_LABEL : LOWEST_FIRST_LABEL

    case DROP:
      return isChecked ? HIGHEST_FIRST_LABEL : LOWEST_FIRST_LABEL

    case NAME:
      return isChecked ? A_TO_Z_LABEL : Z_TO_A_LABEL

    case DISTANCE:
      return isChecked ? CLOSEST_FIRST_LABEL : FURTHEST_FIRST_LABEL
  }
}
