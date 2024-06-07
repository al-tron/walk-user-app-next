import Link from 'next/link'
import useSWR from 'swr'

import { User } from 'lucia'
import clsx from 'clsx'

import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'

import { PageRoutes, ApiRoutes } from '@/consts/routes'

import { restClient } from '@/lib/restClient'
import { useDarkBgRipple } from '@/hooks/useRipple.hook'

import { Button } from '@/components/Button/Button'

export const LogInLinks = ({ isMenuOpen, closeMenu, isMobileNav }: LogInLinksProps) => {
  const [darkBgRippleRef, darkBgRippleEvent] = useDarkBgRipple()

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useSWR<{ data: User | null }>(ApiRoutes.USER_DATA, restClient)

  const isLoggedInStatusAvailable = !isLoadingUser && !userError
  const isUserLoggedIn = !!user?.data && isLoggedInStatusAvailable

  const userProfilePicture = user?.data?.profilePictureUrl

  const renderLogInButtonText = () => {
    if (!isLoggedInStatusAvailable) return 'Loading...'
    return isUserLoggedIn ? 'Account' : 'Log In'
  }

  const logInButtonLink = isUserLoggedIn ? PageRoutes.USER_ACCOUNT : PageRoutes.LOGIN
  const logInButtonText = renderLogInButtonText()

  return (
    <>
      {/* Mobile */}
      <div className="border-t border-gray-300 p-5 dark:border-slate-700 lg:hidden">
        <Button
          as={Link}
          variants={{ rounded: 'full', form: 'fullWidth' }}
          className="lg:hidden"
          disableRippleEffect
          // @note/disableLink
          // Having to disable the log in link button with all the below shenanigans because the anchor element that
          // the `Link` component renders doesn't support the humble `disabled` attribute. We're disabling the link so
          // that the user doesn't get taken to the wrong page before we know whether or not they are a logged in user.
          href={isLoggedInStatusAvailable ? logInButtonLink : {}}
          tabIndex={isMobileNav && isMenuOpen && isLoggedInStatusAvailable ? 0 : -1}
          aria-disabled={!isLoggedInStatusAvailable}
          data-disabled={isLoggedInStatusAvailable ? undefined : true}
          onClick={() => {
            if (isMenuOpen && isMobileNav && isLoggedInStatusAvailable) {
              closeMenu()
            }
          }}
        >
          <LogInButtonIcon
            userProfilePicture={userProfilePicture}
            logInButtonText={logInButtonText}
            iconClasses="absolute left-4"
          />
        </Button>
      </div>

      {/* Desktop */}
      <Link
        className="c-animation-quick ml-1 hidden rounded-lg p-3.5 text-logo outline-0 hover:bg-logo/10 hover:text-white focus-visible:bg-logo/10 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 data-[disabled]:hover:bg-transparent data-[disabled]:hover:text-logo dark:text-slate-200 dark:hover:text-slate-50 dark:focus-visible:text-slate-50 data-[disabled]:dark:hover:text-slate-200 lg:block"
        ref={darkBgRippleRef}
        // @note/disableLink
        onMouseDown={(e) => {
          if (isLoggedInStatusAvailable) {
            darkBgRippleEvent(e)
          }
        }}
        href={isLoggedInStatusAvailable ? logInButtonLink : {}}
        tabIndex={isLoggedInStatusAvailable ? 0 : -1}
        aria-disabled={!isLoggedInStatusAvailable}
        data-disabled={isLoggedInStatusAvailable ? undefined : true}
      >
        <LogInButtonIcon
          userProfilePicture={userProfilePicture}
          logInButtonText={logInButtonText}
          isTextScreenReaderOnly={true}
        />
      </Link>
    </>
  )
}

const LogInButtonIcon = ({
  userProfilePicture,
  logInButtonText,
  iconClasses,
  isTextScreenReaderOnly,
}: LogInLinkIconProps) => (
  <>
    {userProfilePicture ? (
      // Wrapping the plain old img tag in the picture tag stops Next.js complaining about us not using
      // the next/image component and next/image didn't seem to play nicely with the ring classes below.
      <picture className={clsx('block h-6 w-6 overflow-clip rounded-full bg-logo/20 ring-1 ring-current', iconClasses)}>
        <img src={userProfilePicture} className="max-w-full" alt="" aria-hidden="true" />
      </picture>
    ) : (
      <UserCircleIcon className={clsx('h-6 w-6', iconClasses)} aria-hidden="true" />
    )}

    <span className={clsx({ 'sr-only': isTextScreenReaderOnly })}>{logInButtonText}</span>
  </>
)

type LogInLinksProps = {
  isMenuOpen: boolean
  closeMenu: () => void
  isMobileNav: boolean
}

type LogInLinkIconProps = {
  userProfilePicture: string | undefined
  logInButtonText: string
  iconClasses?: string
  isTextScreenReaderOnly?: boolean
}
