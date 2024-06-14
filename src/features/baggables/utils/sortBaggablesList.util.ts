import { SORT_BY_DISTANCE, SORT_BY_DROP, SORT_BY_NAME, SORT_BY_HEIGHT, SORT_ORDER_DEFAULT } from '../baggables.consts'
import { BaggableListItemMaybeWithRelativePosition, SortByType, SortOrderType } from '../baggables.types'

export const sortBaggablesList = ({ searchString, sortBy, sortOrder, BaggablesListData }: SortListParams) => {
  const filteredList = searchString
    ? BaggablesListData.filter(({ name }) => name.toLowerCase().includes(searchString.toLowerCase()))
    : BaggablesListData

  switch (sortBy) {
    case SORT_BY_HEIGHT:
      const heightDescending = filteredList.toSorted((a, b) => a.height - b.height).toReversed()
      return sortOrder === SORT_ORDER_DEFAULT ? heightDescending : heightDescending.toReversed()

    case SORT_BY_DROP:
      const dropDescending = filteredList.toSorted((a, b) => a.drop - b.drop).toReversed()
      return sortOrder === SORT_ORDER_DEFAULT ? dropDescending : dropDescending.toReversed()

    case SORT_BY_NAME:
      const nameAscending = filteredList.toSorted((a, b) => a.name.localeCompare(b.name))
      return sortOrder === SORT_ORDER_DEFAULT ? nameAscending : nameAscending.toReversed()

    case SORT_BY_DISTANCE:
      const distanceDescending = filteredList.toSorted((a, b) => a.distanceFromUser! - b.distanceFromUser!)
      return sortOrder === SORT_ORDER_DEFAULT ? distanceDescending : distanceDescending.toReversed()
  }
}

type SortListParams = {
  searchString?: string
  sortBy: SortByType
  sortOrder: SortOrderType
  BaggablesListData: BaggableListItemMaybeWithRelativePosition[]
}
