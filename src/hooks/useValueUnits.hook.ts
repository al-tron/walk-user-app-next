import { useSettingsContext } from '@/context/useSettings.context'

/**
 * A custom React hook that uses the user preference stored in the SettingsContext to calculate a given value in either
 * the metric or imperial system of units. Eg: In kilometres and metres or in miles and feet. Also returns the
 * abbreviated form of the output units and the full name of the output units.
 *
 * @param initialValue - The initial value in either kilometres or metres (metric).
 * @param initialMetricUnit - A param to specify whether the initial value is kilomtres and therefore will be converted
 * to miles, or metres, in which case it will be converted to feet.
 *
 * @returns The calculated value in the preferred unit system, the abbreviated form of the output units, and the full
 * name of the output units.
 */
export const useValueUnits = (initialValue: number, initialMetricUnit: 'km' | 'm'): UseValueUnitsReturn => {
  const settings = useSettingsContext()

  if (initialMetricUnit === 'km') {
    const value = settings?.isImperial
      ? parseFloat((initialValue * 0.621371).toFixed(2))
      : parseFloat(initialValue.toFixed(2))

    const units = settings?.isImperial ? 'miles' : 'km'
    const unitFullname = settings?.isImperial ? 'miles' : 'kilometers'

    return { value, units, unitFullname }
  } else {
    const value = settings?.isImperial ? Math.round(initialValue * 3.2808) : Math.round(initialValue)

    const units = settings?.isImperial ? 'ft' : 'm'
    const unitFullname = settings?.isImperial ? 'feet' : 'metres'

    return { value, units, unitFullname }
  }
}

export type UseValueUnitsReturn = {
  value: number
  units: 'km' | 'm' | 'miles' | 'ft'
  unitFullname: 'kilometers' | 'metres' | 'miles' | 'feet'
}
