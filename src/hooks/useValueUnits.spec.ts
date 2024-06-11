import { renderHook } from '@testing-library/react'

import { useSettingsContext } from '@/context/useSettings.context'
import { useValueUnits, UseValueUnitsReturn } from './useValueUnits.hook'

jest.mock('@/context/useSettings.context')

describe('useValueUnits.hook', () => {
  it('Should return the value in miles when initialMetricUnit is "km"', () => {
    const initialValue = 10

    ;(useSettingsContext as jest.Mock).mockReturnValue({ isImperial: true })

    const { result } = renderHook(() => useValueUnits(initialValue, 'km'))

    const expected: UseValueUnitsReturn = {
      value: parseFloat((initialValue * 0.621371).toFixed(2)),
      units: 'miles',
      unitFullname: 'miles',
    }

    expect(result.current).toEqual(expected)
  })

  it('Should the value in feet when initialMetricUnit is "m"', () => {
    const initialValue = 10

    ;(useSettingsContext as jest.Mock).mockReturnValue({ isImperial: true })

    const { result } = renderHook(() => useValueUnits(initialValue, 'm'))

    const expected: UseValueUnitsReturn = {
      value: Math.round(initialValue * 3.2808),
      units: 'ft',
      unitFullname: 'feet',
    }

    expect(result.current).toEqual(expected)
  })

  it.each(['km', 'm'] as const)(
    'Should return the original value when isImperial is false and initialUnits is %s',
    (unit) => {
      const initialValue = 10

      ;(useSettingsContext as jest.Mock).mockReturnValue({ isImperial: false })

      const { result } = renderHook(() => useValueUnits(initialValue, unit))

      const expected: UseValueUnitsReturn = {
        value: initialValue,
        units: unit,
        unitFullname: unit === 'km' ? 'kilometers' : 'metres',
      }

      expect(result.current).toEqual(expected)
    },
  )
})
