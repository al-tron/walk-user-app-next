import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'

import { SystemLightDark, ThemeOptions } from '@/types/types'
import { NavBarSettingControlProps } from '../Header.types'

import { useDarkModeContext, DEFAULT_THEME, INIT_THEME, LIGHT_THEME, DARK_THEME } from '@/context/useDarkMode.context'

import { capitaliseWords } from '@/utils/capitaliseWords.util'

import { SelectBox } from '@/components/userInputs/SelectBox/SelectBox'

const LIGHT_ICON = <SunIcon className="h-6 w-6" aria-hidden="true" />
const DARK_ICON = <MoonIcon className="h-6 w-6" aria-hidden="true" />
const SYSTEM_ICON = <ComputerDesktopIcon className="h-6 w-6" aria-hidden="true" />

export const ThemeSelectBox = ({ popoverOpen = false, isMobileNav, isMenuOpen }: NavBarSettingControlProps) => {
  const darkModeContext = useDarkModeContext()

  const activeOption: ThemeOptionType = THEME_OPTIONS.filter((option) => option.name === darkModeContext!.theme)[0]

  return (
    <SelectBox
      labelText="Theme"
      options={selectBoxOptionsFromThemeOptions(THEME_OPTIONS)}
      icon={buttonIcon(darkModeContext!.systemLightDark, darkModeContext!.theme, activeOption)}
      text={capitaliseWords(activeOption.name)}
      id="light-dark-select"
      value={activeOption.name}
      onChange={(event) => {
        darkModeContext!.setTheme(event.target.value as ThemeOptions)
      }}
      tabIndex={(isMobileNav && isMenuOpen) || (!isMobileNav && popoverOpen) ? 0 : -1}
      wrapperClasses="w-36"
    />
  )
}

const buttonIcon = (systemLightDark: SystemLightDark, theme: ThemeOptions, activeOption: ThemeOptionType) => {
  if (systemLightDark === INIT_THEME) {
    return <ArrowPathIcon className="h-6 w-6 animate-spin opacity-60" aria-hidden="true" />
  } else if (theme === DEFAULT_THEME) {
    return systemLightDark === LIGHT_THEME ? LIGHT_ICON : DARK_ICON
  } else {
    return activeOption.icon
  }
}

const selectBoxOptionsFromThemeOptions = (themeOptions: ThemeOptionType[]) =>
  themeOptions.map((option) => ({
    name: capitaliseWords(option.name),
    value: option.name,
  }))

const THEME_OPTIONS: ThemeOptionType[] = [
  { name: LIGHT_THEME, icon: LIGHT_ICON, className: 'rounded-t-lg' },
  { name: DARK_THEME, icon: DARK_ICON, className: 'rounded-none' },
  { name: DEFAULT_THEME, icon: SYSTEM_ICON, className: 'rounded-b-lg' },
]

export type ThemeOptionType = {
  name: ThemeOptions
  icon: React.ReactElement
  className: 'rounded-t-lg' | 'rounded-none' | 'rounded-b-lg'
}
