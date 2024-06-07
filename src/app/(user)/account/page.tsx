import { Suspense } from 'react'

import { Metadata, NextPage } from 'next'

import { ServerRedirectWrapper } from '@/features/user/components/ServerRedirectWrapper/ServerRedirectWrapper'

import { BasicPageLayout } from '@/components/BasicPageLayout/BasicPageLayout'
import { EditUserProfileUi } from '@/features/user/components/EditUserProfile/EditUserProfileUi'
import { EditUserProfileWrapper } from '@/features/user/components/EditUserProfile/EditUserProfileWrapper'

const Account: NextPage = () => {
  return (
    <BasicPageLayout title="My Account">
      <Suspense fallback={<EditUserProfileUi disabled />}>
        <ServerRedirectWrapper wrapperFor="account">
          <EditUserProfileWrapper />
        </ServerRedirectWrapper>
      </Suspense>
    </BasicPageLayout>
  )
}

export const metadata: Metadata = { title: 'My Account' }

export default Account
