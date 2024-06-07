import { ReactNode } from 'react'

import { Container } from '@/components/Container/Container'
import { CurveBanner } from '@/components/CurveBanner/CurveBanner'
import { Title } from '@/components/Title/Title'

export const BasicPageLayout = ({ title, children }: BasicPageLayoutProps) => {
  return (
    <>
      <CurveBanner>
        <Container>
          <Title level={1} align="center" style="xl">
            {title}
          </Title>
        </Container>
      </CurveBanner>

      <Container variants={{ width: 'md', marginBottom: true }}>{children}</Container>
    </>
  )
}

type BasicPageLayoutProps = {
  title: string
  children: ReactNode
}
