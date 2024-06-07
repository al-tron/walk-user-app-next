'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import {
  DISTANCE,
  DROP,
  NAME,
  ORDER_PARAM_NAME,
  QUERY_PARAM_NAME,
  SORT_BY_DEFAULT,
  SORT_ORDER_DEFAULT,
  SORT_PARAM_NAME,
} from '../../baggables.consts'
import { SortByType, SortOrderType } from '../../baggables.types'

import { useLocation } from '@/hooks/useLocation.hook'

import { distanceBetweenPoints } from '../../utils/distanceBetweenPoints.util'
import { angleBetweenPoints } from '../../utils/angleBetweenPoints.util'

import { BaggablesListUi } from './BaggablesListUi'

/**
 * @docs/wrapperUiPattern
 * This component provides client functionality to the adjacent UI component. This is so that a non-functional,
 * disabled or static version of the component can be used as a pre-rendered server component in the `fallback` prop of
 * a `Suspense` boundary to act as a loading skeleton, whilst the client side aspects of the component are loading.
 */
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
  const sortBy = (searchParams.get(SORT_PARAM_NAME)?.toString() as SortByType) || SORT_BY_DEFAULT
  const sortOrder = (searchParams.get(ORDER_PARAM_NAME)?.toString() as SortOrderType) || SORT_ORDER_DEFAULT

  const { latitude, longitude } = useLocation()

  useEffect(() => {
    if (sortBy === DISTANCE && !baggablesListWithRelativePosition && latitude && longitude) {
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
      setSortedBaggablesList(sortList(searchTerm, sortBy, sortOrder, baggablesListWithRelativePosition))
    } else {
      setSortedBaggablesList(sortList(searchTerm, sortBy, sortOrder, staticBaggablesList))
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

const sortList = (
  searchString: string,
  sortBy: SortByType,
  sortOrder: SortOrderType,
  BaggablesListData: BaggableListItemMaybeWithRelativePosition[],
) => {
  const filteredList = BaggablesListData.filter(({ name }) => name.toLowerCase().includes(searchString.toLowerCase()))

  switch (sortBy) {
    case SORT_BY_DEFAULT:
      const heightDescending = filteredList
      return sortOrder === SORT_ORDER_DEFAULT ? heightDescending : heightDescending.toReversed()

    case DROP:
      const dropDescending = filteredList.toSorted((a, b) => a.drop - b.drop).toReversed()
      return sortOrder === SORT_ORDER_DEFAULT ? dropDescending : dropDescending.toReversed()

    case NAME:
      const nameAscending = filteredList.toSorted((a, b) => a.name.localeCompare(b.name))
      return sortOrder === SORT_ORDER_DEFAULT ? nameAscending : nameAscending.toReversed()

    case DISTANCE:
      const distanceDescending = filteredList.toSorted((a, b) => a.distanceFromUser! - b.distanceFromUser!)
      return sortOrder === SORT_ORDER_DEFAULT ? distanceDescending : distanceDescending.toReversed()
  }
}

type BaggableListWrapperProps = {
  staticBaggablesList: BaggableListItem[]
  baggableTypeSlug: string
  baggableTypeName: string
}

type BaggableListItem = {
  name: string
  slug: string
  height: number
  drop: number
  latitude: number
  longitude: number
}

type BaggableListItemWithRelativePosition = BaggableListItem & {
  distanceFromUser: number
  bearingFromUser: number
}

type BaggableListItemMaybeWithRelativePosition = BaggableListItem & {
  distanceFromUser?: number
  bearingFromUser?: number
}
