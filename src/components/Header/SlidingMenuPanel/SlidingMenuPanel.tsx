import { ReactNode } from 'react'

import clsx from 'clsx'
import FocusTrap from 'focus-trap-react'
import { Transition } from '@headlessui/react'

const ANIMATION_TIMING_CLASS = 'c-animation-medium'

export const SlidingMenuPanel = ({
  isMenuOpen,
  isMobileNav,
  slidingMenuElementId,
  children,
}: SlidingMenuPanelProps) => {
  return (
    <>
      {/* Site overlay */}
      <Transition
        as="div"
        className="fixed left-0 top-0 z-20 block h-screen w-screen bg-black/50 dark:bg-black/40 lg:hidden"
        show={isMenuOpen}
        enter={ANIMATION_TIMING_CLASS}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave={ANIMATION_TIMING_CLASS}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      />

      {/* Sliding menu container */}
      <FocusTrap
        active={isMenuOpen}
        focusTrapOptions={{
          fallbackFocus: '#fallback-focus',
          preventScroll: true,
        }}
      >
        <div
          className={clsx(
            ANIMATION_TIMING_CLASS,
            'fixed right-0 top-0 z-20 flex h-full min-h-full w-72 items-center justify-between overflow-y-scroll bg-logo dark:bg-slate-800 lg:relative lg:-mr-1.5 lg:h-auto lg:w-auto lg:overflow-y-visible lg:bg-transparent dark:lg:bg-transparent',
            { 'translate-x-72 lg:translate-x-0': !isMenuOpen },
          )}
          id={slidingMenuElementId}
          aria-hidden={isMobileNav && !isMenuOpen}
        >
          {children}
        </div>
      </FocusTrap>
    </>
  )
}

type SlidingMenuPanelProps = {
  isMenuOpen: boolean
  isMobileNav: boolean
  slidingMenuElementId: string
  children: ReactNode
}
