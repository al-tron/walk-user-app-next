import { act } from 'react'

import { renderHook } from '@testing-library/react'

import { SettingsContextProvider, useSettingsContext } from './useSettings.context'

describe('useSettings.context', () => {
  it('Should get initial value of isImperial from localStorage', () => {
    localStorage.setItem('isImperial', 'true')

    const wrapper = ({ children }: { children: any }) => <SettingsContextProvider>{children}</SettingsContextProvider>
    const { result } = renderHook(() => useSettingsContext(), { wrapper })

    expect(result?.current?.isImperial).toBe(true)
  })

  it('Should update isImperial value in localStorage when it changes', () => {
    localStorage.removeItem('isImperial')

    const wrapper = ({ children }: { children: any }) => <SettingsContextProvider>{children}</SettingsContextProvider>
    const { result } = renderHook(() => useSettingsContext(), { wrapper })

    act(() => {
      result?.current?.setIsImperial(true)
    })

    expect(localStorage.getItem('isImperial')).toBe('true')
  })

  it('Should remove isImperial from localStorage when set to false', () => {
    localStorage.setItem('isImperial', 'true')

    const wrapper = ({ children }: { children: any }) => <SettingsContextProvider>{children}</SettingsContextProvider>
    const { result } = renderHook(() => useSettingsContext(), { wrapper })

    act(() => {
      result?.current?.setIsImperial(false)
    })

    expect(localStorage.getItem('isImperial')).toBe(null)
  })

  it('Should not have isImperial in localStorage initially if it was not set', () => {
    localStorage.removeItem('isImperial')

    const wrapper = ({ children }: { children: any }) => <SettingsContextProvider>{children}</SettingsContextProvider>

    renderHook(() => useSettingsContext(), { wrapper })

    expect(localStorage.getItem('isImperial')).toBe(null)
  })
})
