import { z } from 'zod'

export const BaggableNavItemsResponseSchema = z.object({
  baggableTypes: z.object({
    nodes: z.array(
      z.object({
        slug: z.string(),
        baggable_type_taxonomy: z.object({ pageTitle: z.string() }),
      }),
    ),
  }),
})

export type NavListItemsType = {
  label: string
  path: string
}[]

export type NavBarSettingControlProps = {
  popoverOpen?: boolean
  isMobileNav: boolean
  isMenuOpen: boolean
}
