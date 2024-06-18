import {
  SORT_BY_DISTANCE,
  SORT_BY_DROP,
  SORT_BY_NAME,
  SORT_BY_HEIGHT,
  SORT_ORDER_DEFAULT,
  SORT_ORDER_REVERSED,
} from '../baggables.consts'

import { sortBaggablesList } from './sortBaggablesList.util'

describe('sortBaggablesList.util', () => {
  const MOCK_LIST_DATA = [
    { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
    {
      name: 'Another Item',
      slug: 'another-item',
      height: 3,
      drop: 7,
      latitude: 10,
      longitude: 12,
      distanceFromUser: 7,
    },
    { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
    { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
  ]

  it('Should filter the list based on `searchString` arg', () => {
    const sortedList = sortBaggablesList({
      searchString: 'an',
      sortBy: SORT_BY_HEIGHT,
      sortOrder: SORT_ORDER_DEFAULT,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
    ])
  })

  it('Should sort the list by height in descending order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_HEIGHT,
      sortOrder: SORT_ORDER_DEFAULT,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
    ])
  })

  it('Should sort the list by height in ascending order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_HEIGHT,
      sortOrder: SORT_ORDER_REVERSED,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
    ])
  })

  it('Should sort the list by drop in descending order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_DROP,
      sortOrder: SORT_ORDER_DEFAULT,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
    ])
  })

  it('Should sort the list by drop in ascending order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_DROP,
      sortOrder: SORT_ORDER_REVERSED,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
    ])
  })

  it('Should sort the list by name in "A - Z" order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_NAME,
      sortOrder: SORT_ORDER_DEFAULT,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
    ])
  })

  it('Should sort the list by name in "Z - A" order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_NAME,
      sortOrder: SORT_ORDER_REVERSED,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
    ])
  })

  it('Should sort the list by distance from user in ascending order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_DISTANCE,
      sortOrder: SORT_ORDER_DEFAULT,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
    ])
  })

  it('Should sort the list by distance from user in descending order', () => {
    const sortedList = sortBaggablesList({
      sortBy: SORT_BY_DISTANCE,
      sortOrder: SORT_ORDER_REVERSED,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual([
      {
        name: 'Another Item',
        slug: 'another-item',
        height: 3,
        drop: 7,
        latitude: 10,
        longitude: 12,
        distanceFromUser: 7,
      },
      { name: 'Item One', slug: 'item-one', height: 5, drop: 3, latitude: 10, longitude: 12, distanceFromUser: 4 },
      { name: 'An Item', slug: 'an-item', height: 4, drop: 1, latitude: 10, longitude: 12, distanceFromUser: 1 },
      { name: 'Item Four', slug: 'item-four', height: 9, drop: 5, latitude: 10, longitude: 12, distanceFromUser: 0 },
    ])
  })

  it('Should return array exactly as passed in, in the `baggablesListData` argument when `sortBy` is undefined', () => {
    const sortedList = sortBaggablesList({
      // @ts-expect-error
      sortBy: undefined,
      sortOrder: SORT_ORDER_REVERSED,
      baggablesListData: MOCK_LIST_DATA,
    })

    expect(sortedList).toEqual(MOCK_LIST_DATA)
  })
})
