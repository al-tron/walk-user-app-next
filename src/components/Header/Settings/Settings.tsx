import clsx from 'clsx'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'

import { NavBarSettingControlProps } from '../Header.types'

import { useSettingsContext } from '@/context/useSettings.context'
import { useDarkBgRipple } from '@/hooks/useRipple.hook'

import { ThemeSelectBox } from '../ThemeSelectBox/ThemeSelectBox'
import { ToggleSwitch } from '@/components/userInputs/ToggleSwitch/ToggleSwitch'

export const Settings = ({ isMenuOpen, isMobileNav }: SettingsProps) => {
  const [darkBgRippleRef, darkBgRippleEvent] = useDarkBgRipple()

  return (
    <>
      {/* Mobile */}
      <div className="flex w-full flex-col items-center justify-between gap-5 p-5 lg:hidden" aria-label="settings">
        <UnitsToggleSwitch isMobileNav={isMobileNav} isMenuOpen={isMenuOpen} />

        <ThemeSelectBox isMobileNav={isMobileNav} isMenuOpen={isMenuOpen} />
      </div>

      {/* Desktop */}
      <Popover className="relative hidden lg:block">
        {({ open }) => (
          <>
            <PopoverButton
              className={clsx(
                'c-animation-quick ml-4 rounded-lg p-3.5 text-logo outline-0 lg:hover:bg-logo/10 lg:hover:text-logo lg:focus-visible:bg-logo/10 dark:lg:text-slate-200 dark:lg:hover:text-slate-50 dark:lg:focus-visible:text-slate-50',
                { 'bg-logo/10 text-white': open },
              )}
              ref={darkBgRippleRef}
              onMouseDown={darkBgRippleEvent}
            >
              <>
                <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">{`${open ? 'Close' : 'Open'} settings menu`}</span>
              </>
            </PopoverButton>

            <Transition
              enter="c-animation-quick"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="c-animation-quick"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <PopoverPanel
                className="absolute right-0 mt-2 flex w-60 flex-col items-center justify-between gap-3 rounded-lg border border-white bg-gray-50 p-3 outline-0 drop-shadow-2xl dark:border-slate-600 dark:bg-slate-800"
                aria-label="settings"
              >
                <UnitsToggleSwitch popoverOpen={open} isMobileNav={isMobileNav} isMenuOpen={isMenuOpen} />

                <ThemeSelectBox popoverOpen={open} isMobileNav={isMobileNav} isMenuOpen={isMenuOpen} />
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

const UnitsToggleSwitch = ({ popoverOpen = false, isMobileNav, isMenuOpen }: NavBarSettingControlProps) => {
  const settings = useSettingsContext()

  return (
    <ToggleSwitch
      labelText="Units"
      id="units-select-toggle"
      description="Switch between metric (kilometers and meters) or imperial (miles and feet)"
      checkedOptionLabel="km | m"
      uncheckedOptionLabel="miles | ft"
      isChecked={!settings?.isImperial}
      tabIndex={(isMobileNav && isMenuOpen) || (!isMobileNav && popoverOpen) ? 0 : -1}
      onChange={() => settings?.setIsImperial(!settings.isImperial)}
      wrapperClasses="w-36"
    />
  )
}

type SettingsProps = {
  isMenuOpen: boolean
  isMobileNav: boolean
}
