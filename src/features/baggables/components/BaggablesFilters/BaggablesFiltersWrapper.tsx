'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import {
  A_TO_Z_LABEL,
  CLOSEST_FIRST_LABEL,
  SORT_BY_DISTANCE,
  SORT_BY_DROP,
  FURTHEST_FIRST_LABEL,
  HIGHEST_FIRST_LABEL,
  LOWEST_FIRST_LABEL,
  SORT_BY_NAME,
  ORDER_PARAM_NAME,
  QUERY_PARAM_NAME,
  SORT_BY_HEIGHT,
  SORT_BY_HEIGHT_ICON,
  SORT_BY_DISTANCE_ICON,
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
  [SORT_BY_HEIGHT]: SORT_BY_HEIGHT_ICON,
  [SORT_BY_DROP]: SORT_BY_DROP_ICON,
  [SORT_BY_NAME]: SORT_BY_NAME_ICON,
  [SORT_BY_DISTANCE]: SORT_BY_DISTANCE_ICON,
}

export const BaggablesFiltersWrapper = ({ baggableTypeName }: { baggableTypeName: string }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const { hasGeoCapabilities } = useLocation()

  const searchTerm = searchParams.get(QUERY_PARAM_NAME)?.toString() || ''
  const sortBy = (searchParams.get(SORT_PARAM_NAME)?.toString() as SortByType) || SORT_BY_HEIGHT
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
    defaultFieldValue: typeof SORT_BY_HEIGHT | typeof SORT_ORDER_DEFAULT,
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
      { name: capitaliseWords(SORT_BY_HEIGHT), value: SORT_BY_HEIGHT },
      { name: capitaliseWords(SORT_BY_DROP), value: SORT_BY_DROP },
      { name: capitaliseWords(SORT_BY_NAME), value: SORT_BY_NAME },
    ]

    if (hasGeoCapabilities) {
      return [...defaultOptions, { name: 'Distance from your location', value: SORT_BY_DISTANCE }]
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
        handleSortByAndOrder(SORT_PARAM_NAME, event as SortByType, SORT_BY_HEIGHT)
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
    case SORT_BY_HEIGHT:
      return isChecked ? HIGHEST_FIRST_LABEL : LOWEST_FIRST_LABEL

    case SORT_BY_DROP:
      return isChecked ? HIGHEST_FIRST_LABEL : LOWEST_FIRST_LABEL

    case SORT_BY_NAME:
      return isChecked ? A_TO_Z_LABEL : Z_TO_A_LABEL

    case SORT_BY_DISTANCE:
      return isChecked ? CLOSEST_FIRST_LABEL : FURTHEST_FIRST_LABEL
  }
}
