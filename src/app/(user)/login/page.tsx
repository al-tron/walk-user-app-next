import { Suspense } from 'react'

import { Metadata, NextPage } from 'next'

import { ServerRedirectWrapper } from '@/features/user/components/ServerRedirectWrapper/ServerRedirectWrapper'

import { Container } from '@/components/Container/Container'
import { Title } from '@/components/Title/Title'
import { LogInButtonsUi } from '@/features/user/components/LogInButtons/LogInButtonsUi'
import { LogInButtonsWrapper } from '@/features/user/components/LogInButtons/LogInButtonsWrapper'

const Login: NextPage = () => {
  return (
    <div className="c-topo-bg dark:c-topo-bg--dark flex h-screen w-full items-center">
      <Container variants={{ width: 'sm' }}>
        <div className="pt-12 xxs:pt-0">
          <Title level={1} style="xl" align="center" classes="mb-3">
            Welcome
          </Title>

          <Title level={2} style="xs" align="center" classes="mb-10">
            Discover your next
            <span className="block xs2:inline"> {process.env.APP_REGION} adventure</span>
          </Title>
        </div>

        <Suspense fallback={<LogInButtonsUi disabled />}>
          <ServerRedirectWrapper wrapperFor="login">
            <LogInButtonsWrapper />
          </ServerRedirectWrapper>
        </Suspense>
      </Container>
    </div>
  )
}

export const metadata: Metadata = { title: 'Log in' }

export default Login
