import { useSettingsContext } from '@/context/useSettings.context'

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
