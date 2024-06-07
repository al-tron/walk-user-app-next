import { NextPage } from 'next'
import Link from 'next/link'

import { PageRoutes } from '@/consts/routes'

import { Container } from '@/components/Container/Container'
import { Title } from '@/components/Title/Title'

const NotFound: NextPage = () => {
  return (
    <div className="c-topo-bg dark:c-topo-bg--dark flex h-screen w-full items-center">
      <Container variants={{ width: 'lg' }}>
        <title>404: Page Not Found</title>

        <Title level={1} style="xl" align="center" classes="mb-12">
          404: Page Not Found
        </Title>

        <Title level={2} style="xs" align="center">
          You look a bit lost - need directions? <Link href={PageRoutes.HOME}>Click here</Link> to navigate to the home
          page.
        </Title>
      </Container>
    </div>
  )
}

export default NotFound
