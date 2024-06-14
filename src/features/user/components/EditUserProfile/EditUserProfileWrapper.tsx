'use client'

import { mutate } from 'swr'

import { ApiRoutes } from '@/consts/routes'

import { deleteUser } from '../../actions/deleteUser.action'
import { logOut } from '../../actions/logOut.action'

import { EditUserProfileUi } from './EditUserProfileUi'

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
