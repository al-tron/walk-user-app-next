import { PageRoutes } from '@/consts/routes'

import { gqlClient } from '@/lib/gqlClient'
import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'

import { Container } from '@/components/Container/Container'
import { NavBar } from './NavBar/NavBar'

import { baggableNavItemsQuery } from './Header.graphs'
import { BaggableNavItemsResponseSchema } from './Header.types'

export const Header = async () => {
  const { siteName } = await getSiteNameAndMetaDescription()
  const dynamicNavItems = await getDynamicNavItems()

  const kebabCaseSiteName = siteName.replaceAll(' ', '-').toLocaleLowerCase()
  const logoUrl = `/img/logos/${kebabCaseSiteName}.svg`

  return (
    <header className="absolute z-20 w-full">
      <Container className="relative">
        <NavBar logoUrl={logoUrl} siteName={siteName} dynamicNavItems={dynamicNavItems} />
      </Container>
    </header>
  )
}

const getDynamicNavItems = async () => {
  const { baggableTypes } = await gqlClient(baggableNavItemsQuery, BaggableNavItemsResponseSchema)

  const dynamicNavItems = baggableTypes.nodes.map((baggableType) => ({
    label: baggableType.baggable_type_taxonomy.pageTitle,
    path: PageRoutes.BAGGABLES_LIST.replace('[baggableTypeSlug]', baggableType.slug),
  }))

  return dynamicNavItems
}
