'use client'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { PageRoutes } from '@/consts/routes'
import { NavListItemsType } from '../Header.types'

import { useWindowWidth } from '@/hooks/useWindowWidth.hook'
import { useConditionalClickOutside } from '@/hooks/useConditionalClickOutside.hook'
import { useConditionalKeydown } from '@/hooks/useConditionalKeydown.hook'
import { useDarkBgRipple } from '@/hooks/useRipple.hook'

import { ToggleMenuButton } from '../ToggleMenuButton/ToggleMenuButton'
import { SlidingMenuPanel } from '../SlidingMenuPanel/SlidingMenuPanel'
import { LinksList } from '../LinksList/LinksList'
import { Settings } from '../Settings/Settings'
import { LogInLinks } from '../LogInLinks/LogInLinks'

const NAV_COLLAPSE_WIDTH = 992
const SLIDING_MENU_ELEMENT_ID = 'main-sliding-menu-element'
const NAV_BAR_HEIGHT_CLASS = 'h-[76px]'

export const NavBar = ({ logoUrl, siteName, dynamicNavItems }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const [windowWidth] = useWindowWidth()
  // Closes open menu when escape key is pressed.
  useConditionalKeydown({ keyboardEventCode: 'Escape', condition: isMenuOpen, callback: () => setIsMenuOpen(false) })
  // Closes open menu on click outside.
  useConditionalClickOutside({ ref: menuRef, condition: isMenuOpen, callback: () => setIsMenuOpen(false) })

  const [rippleRef, rippleEvent] = useDarkBgRipple()

  const isMobileNav = windowWidth < NAV_COLLAPSE_WIDTH

  // Close menu when viewport switches to desktop size.
  useEffect(() => {
    if (!isMobileNav) {
      setIsMenuOpen(false)
    }
  }, [isMobileNav])

  // Prevent scrolling on document body when mobile nav is open.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-clip')
    } else {
      document.body.classList.remove('overflow-clip')
    }

    return () => {
      document.body.classList.remove('overflow-clip')
    }
  }, [isMenuOpen])

  return (
    <div className={`flex items-center justify-between ${NAV_BAR_HEIGHT_CLASS}`}>
      <Link
        className="c-animation-quick z-10 -ml-1.5 flex items-center rounded-lg px-1.5 py-1 focus:outline-0 focus-visible:bg-logo/10"
        href={PageRoutes.HOME}
        ref={rippleRef}
        onMouseDown={rippleEvent}
        aria-label="Logo home link"
      >
        <Image className="dark:brightness-90" src={logoUrl} width="224" height="52" alt={`${siteName} Logo`} />
      </Link>

      {/* Open menu button */}
      <ToggleMenuButton
        isMenuOpen={false}
        toggleMenu={() => setIsMenuOpen(true)}
        className="lg:hidden"
        aria-controls={SLIDING_MENU_ELEMENT_ID}
        aria-expanded={isMenuOpen || !isMobileNav}
        aria-hidden={isMenuOpen}
        tabIndex={isMenuOpen || !isMobileNav ? -1 : 0}
      />

      <SlidingMenuPanel
        isMenuOpen={isMenuOpen}
        isMobileNav={isMobileNav}
        slidingMenuElementId={SLIDING_MENU_ELEMENT_ID}
      >
        <div ref={menuRef} className="flex h-full w-full flex-col justify-between lg:flex-row lg:items-center">
          <div>
            <div className="border-b border-gray-300 px-4 dark:border-slate-700 lg:hidden">
              <div className={`flex items-center justify-end ${NAV_BAR_HEIGHT_CLASS}`}>
                {/* Close menu button */}
                <ToggleMenuButton
                  isMenuOpen={true}
                  toggleMenu={() => setIsMenuOpen(false)}
                  aria-controls={SLIDING_MENU_ELEMENT_ID}
                  aria-expanded={isMenuOpen}
                  tabIndex={isMenuOpen ? 0 : -1}
                />
              </div>
            </div>

            <LinksList
              closeMenu={() => setIsMenuOpen(false)}
              isMenuOpen={isMenuOpen}
              isMobileNav={isMobileNav}
              dynamicNavItems={dynamicNavItems}
            />
          </div>

          <div className="hidden h-7 border-r opacity-60 lg:inline-block"></div>

          <div className="lg:flex">
            <Settings isMobileNav={isMobileNav} isMenuOpen={isMenuOpen} />

            <LogInLinks closeMenu={() => setIsMenuOpen(false)} isMenuOpen={isMenuOpen} isMobileNav={isMobileNav} />
          </div>
        </div>
      </SlidingMenuPanel>
    </div>
  )
}

type NavBarProps = {
  logoUrl: string
  siteName: string
  dynamicNavItems: NavListItemsType
}
