import Image from 'next/image'

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'

import { Button } from '@/components/Button/Button'

export const LogInButtonsUi = ({
  handleLogInGoogle,
  handleLogInApple,
  handleLogInStrava,
  googleClicked,
  appleClicked,
  stravaClicked,
  disabled,
}: LogInButtonsUiProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Button variants={{ rounded: 'full', form: 'fullWidth' }} onClick={handleLogInGoogle} disabled={disabled}>
        <>
          {googleClicked ? (
            <ArrowPathIcon className="absolute left-4 mr-2 h-6 w-6 animate-spin" />
          ) : (
            <Image
              src="/img/icons/google.svg"
              className="absolute left-4 mr-2"
              width="22"
              height="22"
              alt=""
              aria-hidden="true"
            />
          )}
          Log In With Google
        </>
      </Button>

      <Button variants={{ rounded: 'full', form: 'fullWidth' }} onClick={handleLogInApple} disabled={disabled}>
        <>
          {appleClicked ? (
            <ArrowPathIcon className="absolute left-4 mr-2 h-6 w-6 animate-spin" />
          ) : (
            <Image
              src="/img/icons/apple.svg"
              className="absolute left-4 mr-2"
              width="25"
              height="25"
              alt=""
              aria-hidden="true"
            />
          )}
          Log In With Apple
        </>
      </Button>

      <Button variants={{ rounded: 'full', form: 'fullWidth' }} onClick={handleLogInStrava} disabled={disabled}>
        <>
          {stravaClicked ? (
            <ArrowPathIcon className="absolute left-4 mr-2 h-6 w-6 animate-spin" />
          ) : (
            <Image
              src="/img/icons/strava.svg"
              className="absolute left-4 mr-2"
              width="28"
              height="28"
              alt=""
              aria-hidden="true"
            />
          )}
          Log In With Strava
        </>
      </Button>
    </div>
  )
}

type LogInButtonsUiProps = {
  handleLogInGoogle?: () => void
  handleLogInApple?: () => void
  handleLogInStrava?: () => void
  googleClicked?: boolean
  appleClicked?: boolean
  stravaClicked?: boolean
  disabled?: boolean
}
