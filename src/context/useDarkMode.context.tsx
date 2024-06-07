'use client'

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react'

import { DarkLight, SystemLightDark, ThemeOptions } from '@/types/types'

export const DARK_THEME = 'dark'
export const LIGHT_THEME = 'light'
export const DEFAULT_THEME = 'default'
export const INIT_THEME = 'init'

const DarkModeContext = createContext<DarkModeContextType | null>(null)
export const useDarkModeContext = () => useContext(DarkModeContext)

export const DarkModeContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [systemLightDark, setSystemLightDark] = useState<SystemLightDark>('init')
  const [oldTheme, setOldTheme] = useState<ThemeOptions>(DEFAULT_THEME)
  const [theme, setTheme] = useState<ThemeOptions>(DEFAULT_THEME)
  const [displayedTheme, setDisplayedTheme] = useState<DarkLight>(LIGHT_THEME)

  const setThemeAndOldTheme = (theme: ThemeOptions) => {
    setTheme(theme)
    setOldTheme(theme)
  }

  useEffect(() => {
    const syncSystemThemeToApp = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setSystemLightDark(DARK_THEME)
        setDisplayedTheme(DARK_THEME)

        if (localStorage.getItem('theme') === DARK_THEME) {
          setThemeAndOldTheme(DARK_THEME)
          window.document.documentElement.classList.add('dark')
        } else if (localStorage.getItem('theme') === LIGHT_THEME) {
          setThemeAndOldTheme(LIGHT_THEME)
          window.document.documentElement.classList.remove('dark')
        } else {
          setThemeAndOldTheme(DEFAULT_THEME)
          window.document.documentElement.classList.add('dark')
        }
      } else {
        setSystemLightDark(LIGHT_THEME)
        setDisplayedTheme(LIGHT_THEME)

        if (localStorage.getItem('theme') === DARK_THEME) {
          setThemeAndOldTheme(DARK_THEME)
          window.document.documentElement.classList.add('dark')
        } else if (localStorage.getItem('theme') === LIGHT_THEME) {
          setThemeAndOldTheme(LIGHT_THEME)
          window.document.documentElement.classList.remove('dark')
        } else {
          setThemeAndOldTheme(DEFAULT_THEME)
          window.document.documentElement.classList.remove('dark')
        }
      }
    }

    syncSystemThemeToApp()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncSystemThemeToApp)

    switch (localStorage.getItem('theme')) {
      case DARK_THEME:
        setThemeAndOldTheme(DARK_THEME)
        setDisplayedTheme(DARK_THEME)
        window.document.documentElement.classList.add('dark')
        break

      case LIGHT_THEME:
        setThemeAndOldTheme(LIGHT_THEME)
        setDisplayedTheme(LIGHT_THEME)
    }

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', syncSystemThemeToApp)
    }
  }, [])

  useEffect(() => {
    const handleThemeSwitch = (theme: ThemeOptions, systemLightDark: SystemLightDark) => {
      setThemeAndOldTheme(theme)

      switch (theme) {
        case LIGHT_THEME:
          setDisplayedTheme(LIGHT_THEME)
          localStorage.setItem('theme', theme)
          window.document.documentElement.classList.remove('dark')
          break

        case DARK_THEME:
          setDisplayedTheme(DARK_THEME)
          localStorage.setItem('theme', theme)
          window.document.documentElement.classList.add('dark')
          break

        case DEFAULT_THEME:
          setDisplayedTheme(systemLightDark as DarkLight)
          localStorage.removeItem('theme')

          systemLightDark === DARK_THEME
            ? window.document.documentElement.classList.add('dark')
            : window.document.documentElement.classList.remove('dark')
      }
    }

    theme !== oldTheme && handleThemeSwitch(theme, systemLightDark)
  }, [theme, systemLightDark, oldTheme, displayedTheme])

  return (
    <DarkModeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
        systemLightDark: systemLightDark,
        displayedTheme: displayedTheme,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}

export type DarkModeContextType = {
  theme: ThemeOptions
  setTheme: Dispatch<SetStateAction<ThemeOptions>>
  systemLightDark: SystemLightDark
  displayedTheme: DarkLight
} | null
