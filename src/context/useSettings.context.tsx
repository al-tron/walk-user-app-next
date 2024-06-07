'use client'

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react'

const SettingsContext = createContext<SettingsContextType>(null)
export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [isImperial, setIsImperial] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isImperial')) {
      setIsImperial(true)
    }
  }, [])

  useEffect(() => {
    if (isImperial) {
      localStorage.setItem('isImperial', 'true')
    } else {
      localStorage.removeItem('isImperial')
    }
  }, [isImperial])

  return <SettingsContext.Provider value={{ isImperial, setIsImperial }}>{children}</SettingsContext.Provider>
}

type SettingsContextType = {
  isImperial: boolean
  setIsImperial: Dispatch<SetStateAction<boolean>>
} | null
