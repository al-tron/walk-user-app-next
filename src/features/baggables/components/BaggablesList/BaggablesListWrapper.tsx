'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import {
  SORT_BY_DISTANCE,
  ORDER_PARAM_NAME,
  QUERY_PARAM_NAME,
  SORT_BY_HEIGHT,
  SORT_ORDER_DEFAULT,
  SORT_PARAM_NAME,
} from '../../baggables.consts'
import {
  BaggableListItem,
  BaggableListItemMaybeWithRelativePosition,
  BaggableListItemWithRelativePosition,
  SortByType,
  SortOrderType,
} from '../../baggables.types'

import { useLocation } from '@/hooks/useLocation.hook'

import { sortBaggablesList } from '../../utils/sortBaggablesList.util'
import { distanceBetweenPoints } from '../../utils/distanceBetweenPoints.util'
import { angleBetweenPoints } from '../../utils/angleBetweenPoints.util'

import { BaggablesListUi } from './BaggablesListUi'

export const BaggablesListWrapper = ({
  staticBaggablesList,
  baggableTypeSlug,
  baggableTypeName,
}: BaggableListWrapperProps) => {
  const searchParams = useSearchParams()

  const [sortedBaggablesList, setSortedBaggablesList] = useState<BaggableListItemMaybeWithRelativePosition[]>([])
  const [baggablesListWithRelativePosition, setBaggablesListWithRelativePosition] =
    useState<BaggableListItemWithRelativePosition[]>()

  // Updates the baggables list count in the pre-rendered page parent component.
  useLayoutEffect(() => {
    const DOMNode = document.getElementById('filtered-list-count')

    if (DOMNode) {
      DOMNode.textContent = String(sortedBaggablesList.length)
    }
  }, [sortedBaggablesList])

  const searchTerm = searchParams.get(QUERY_PARAM_NAME)?.toString() || ''
  const sortBy = (searchParams.get(SORT_PARAM_NAME)?.toString() as SortByType) || SORT_BY_HEIGHT
  const sortOrder = (searchParams.get(ORDER_PARAM_NAME)?.toString() as SortOrderType) || SORT_ORDER_DEFAULT

  const { latitude, longitude } = useLocation()

  useEffect(() => {
    if (sortBy === SORT_BY_DISTANCE && !baggablesListWithRelativePosition && latitude && longitude) {
      const userLocation = { latitude, longitude }

      const BaggablesListDataWithRelativePosition = staticBaggablesList.map((baggable) => {
        const baggableLocation = {
          latitude: baggable.latitude,
          longitude: baggable.longitude,
        }

        return {
          ...baggable,
          distanceFromUser: distanceBetweenPoints(userLocation, baggableLocation),
          bearingFromUser: angleBetweenPoints(userLocation, baggableLocation),
        }
      })

      setBaggablesListWithRelativePosition(BaggablesListDataWithRelativePosition)
    }

    if (baggablesListWithRelativePosition) {
      setSortedBaggablesList(
        sortBaggablesList({
          searchString: searchTerm,
          sortBy: sortBy,
          sortOrder: sortOrder,
          BaggablesListData: baggablesListWithRelativePosition,
        }),
      )
    } else {
      setSortedBaggablesList(
        sortBaggablesList({
          searchString: searchTerm,
          sortBy: sortBy,
          sortOrder: sortOrder,
          BaggablesListData: staticBaggablesList,
        }),
      )
    }
  }, [searchTerm, sortBy, sortOrder, baggablesListWithRelativePosition, latitude, longitude, staticBaggablesList])

  return (
    <BaggablesListUi
      baggablesList={sortedBaggablesList || staticBaggablesList}
      baggableTypeSlug={baggableTypeSlug}
      baggableTypeName={baggableTypeName}
    />
  )
}

type BaggableListWrapperProps = {
  staticBaggablesList: BaggableListItem[]
  baggableTypeSlug: string
  baggableTypeName: string
}
