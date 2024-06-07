import { tv, type VariantProps } from 'tailwind-variants'

export const container = tv({
  base: 'mx-auto w-full px-3.5 xxs:px-4',
  variants: {
    width: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xxl: 'max-w-screen-xxl',
    },
    marginBottom: {
      true: 'mb-16 lg:mb-24',
    },
  },
  defaultVariants: {
    width: 'xxl',
    marginBottom: false,
  },
})

export type ContainerVariantsType = VariantProps<typeof container>
