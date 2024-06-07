'use client'

import { mutate } from 'swr'

import { ApiRoutes } from '@/consts/routes'

import { deleteUser } from '../../actions/deleteUser.action'
import { logOut } from '../../actions/logOut.action'

import { EditUserProfileUi } from './EditUserProfileUi'

/**
 * @docs/wrapperUiPattern
 * This component provides client functionality to the adjacent UI component. This is so that a non-functional,
 * disabled or static version of the component can be used as a pre-rendered server component in the `fallback` prop of
 * a `Suspense` boundary to act as a loading skeleton, whilst the client side aspects of the component are loading.
 */
export const EditUserProfileWrapper = () => {
  return <EditUserProfileUi handleLogOut={handleLogOut} handleDeleteUser={handleDeleteUser} />
}

const handleLogOut = async () => {
  await logOut()

  mutate(ApiRoutes.USER_DATA)
}

const handleDeleteUser = async () => {
  await deleteUser()

  mutate(ApiRoutes.USER_DATA)
}
