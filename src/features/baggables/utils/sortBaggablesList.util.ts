import { SORT_BY_DISTANCE, SORT_BY_DROP, SORT_BY_NAME, SORT_BY_HEIGHT, SORT_ORDER_DEFAULT } from '../baggables.consts'
import { BaggableListItemMaybeWithRelativePosition, SortByType, SortOrderType } from '../baggables.types'

export const sortBaggablesList = ({ searchString, sortBy, sortOrder, baggablesListData }: SortListParams) => {
  const filteredList = searchString
    ? baggablesListData.filter(({ name }) => name.toLowerCase().includes(searchString.toLowerCase()))
    : baggablesListData

  // Would love to re-write this as a switch statement but the Jest code
  // coverage seems to falsely report an uncovered line for some reason.
  if (sortBy === SORT_BY_HEIGHT) {
    const heightDescending = filteredList.toSorted((a, b) => a.height - b.height).toReversed()
    return sortOrder === SORT_ORDER_DEFAULT ? heightDescending : heightDescending.toReversed()
  } else if (sortBy === SORT_BY_DROP) {
    const dropDescending = filteredList.toSorted((a, b) => a.drop - b.drop).toReversed()
    return sortOrder === SORT_ORDER_DEFAULT ? dropDescending : dropDescending.toReversed()
  } else if (sortBy === SORT_BY_NAME) {
    const nameAscending = filteredList.toSorted((a, b) => a.name.localeCompare(b.name))
    return sortOrder === SORT_ORDER_DEFAULT ? nameAscending : nameAscending.toReversed()
  } else if (sortBy === SORT_BY_DISTANCE) {
    const distanceDescending = filteredList.toSorted((a, b) => a.distanceFromUser! - b.distanceFromUser!)
    return sortOrder === SORT_ORDER_DEFAULT ? distanceDescending : distanceDescending.toReversed()
  }

  // Can also remove this return if able to convert to switch statement in future.
  return baggablesListData
}

type SortListParams = {
  searchString?: string
  sortBy: SortByType
  sortOrder: SortOrderType
  baggablesListData: BaggableListItemMaybeWithRelativePosition[]
}
