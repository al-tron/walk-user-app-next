import { act } from 'react'

import { renderHook } from '@testing-library/react'

import { DarkModeContextProvider, useDarkModeContext } from './useDarkMode.context'

describe('useDarkMode.context', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    localStorage.removeItem('theme')
    document.documentElement.classList.remove('dark')
    jest.clearAllMocks()
  })

  it('Should get the initial theme value of "dark" from localStorage, returns correct theme state values, adds .dark class to document', () => {
    localStorage.setItem('theme', 'dark')

    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    const { result } = renderHook(() => useDarkModeContext(), { wrapper })

    expect(result?.current?.theme).toBe('dark')
    expect(result?.current?.systemLightDark).toBe('light') // Because user system "prefers-color-scheme" isn't "dark"
    expect(result?.current?.displayedTheme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('Should get the initial theme value of "light" from localStorage, returns correct theme state values, does not add .dark class to document', () => {
    localStorage.setItem('theme', 'light')

    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    const { result } = renderHook(() => useDarkModeContext(), { wrapper })

    expect(result?.current?.theme).toBe('light')
    expect(result?.current?.systemLightDark).toBe('light')
    expect(result?.current?.displayedTheme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('Should update localStorage theme correctly when "theme" changes, removes it when "default" is selected and returns correct state values', () => {
    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    const { result } = renderHook(() => useDarkModeContext(), { wrapper })

    expect(result?.current?.theme).toBe('default')
    expect(result?.current?.systemLightDark).toBe('light')
    expect(result?.current?.displayedTheme).toBe('light')
    expect(localStorage.getItem('theme')).toBeNull()

    act(() => {
      result?.current?.setTheme('dark')
    })

    expect(result?.current?.theme).toBe('dark')
    expect(result?.current?.systemLightDark).toBe('light')
    expect(result?.current?.displayedTheme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => {
      result?.current?.setTheme('light')
    })

    expect(result?.current?.theme).toBe('light')
    expect(result?.current?.systemLightDark).toBe('light')
    expect(result?.current?.displayedTheme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')

    act(() => {
      result?.current?.setTheme('default')
    })

    expect(result?.current?.theme).toBe('default')
    expect(result?.current?.systemLightDark).toBe('light')
    expect(result?.current?.displayedTheme).toBe('light')
    expect(localStorage.getItem('theme')).toBeNull()
  })

  it('Should add .dark class to document after dark theme is selected', () => {
    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    const { result } = renderHook(() => useDarkModeContext(), { wrapper })

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    act(() => {
      result?.current?.setTheme('dark')
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('Should add .dark class to document when prefers-color-scheme is set to "dark" and user has previously manually selected the dark theme', () => {
    localStorage.setItem('theme', 'dark')

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    renderHook(() => useDarkModeContext(), { wrapper })

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('Should not add .dark class to document when prefers-color-scheme is set to "dark" but user has previously manually selected the light theme', () => {
    localStorage.setItem('theme', 'light')

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    renderHook(() => useDarkModeContext(), { wrapper })

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('Should return correct state values and adds .dark class if prefers-color-scheme is set to "dark", reverts back when switched away and then back to default', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const wrapper = ({ children }: { children: any }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>
    const { result } = renderHook(() => useDarkModeContext(), { wrapper })

    expect(result?.current?.theme).toBe('default')
    expect(result?.current?.systemLightDark).toBe('dark')
    expect(result?.current?.displayedTheme).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result?.current?.setTheme('light')
    })

    expect(result?.current?.theme).toBe('light')
    expect(result?.current?.systemLightDark).toBe('dark')
    expect(result?.current?.displayedTheme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    act(() => {
      result?.current?.setTheme('default')
    })

    expect(result?.current?.theme).toBe('default')
    expect(result?.current?.systemLightDark).toBe('dark')
    expect(result?.current?.displayedTheme).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
