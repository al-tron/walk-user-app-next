'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { googleAuthorizationUrl } from '../../actions/googleAuthorizationUrl.action'

import { LogInButtonsUi } from './LogInButtonsUi'

export const LogInButtonsWrapper = () => {
  const router = useRouter()

  const [googleClicked, setGoogleClicked] = useState(false)
  const [appleClicked, setAppleClicked] = useState(false)
  const [stravaClicked, setStravaClicked] = useState(false)

  const logInAttempted = googleClicked || appleClicked || stravaClicked

  const handleLogInGoogle = async () => {
    setGoogleClicked(true)

    const url = await googleAuthorizationUrl()
    router.push(url)
  }

  const handleLogInApple = async () => {
    setAppleClicked(true)
  }

  const handleLogInStrava = async () => {
    setStravaClicked(true)
  }

  return (
    <LogInButtonsUi
      handleLogInGoogle={handleLogInGoogle}
      handleLogInApple={handleLogInApple}
      handleLogInStrava={handleLogInStrava}
      googleClicked={googleClicked}
      appleClicked={appleClicked}
      stravaClicked={stravaClicked}
      disabled={logInAttempted}
    />
  )
}
