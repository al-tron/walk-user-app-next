import { tv, type VariantProps } from 'tailwind-variants'

export const cardWrapper = tv({
  slots: {
    element: 'c-animation-medium relative rounded-3xl shadow-md focus-within:shadow-xl hover:shadow-xl',
    link: 'block rounded-3xl outline-none',
  },
  variants: {
    bgBehindCard: {
      light: {
        element: 'bg-white text-gray-700 dark:bg-slate-700 dark:text-slate-300',
        link: 'focus-visible:ring-0 dark:focus-visible:ring-2 dark:focus-visible:ring-slate-400',
      },
      dark: {
        element: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-slate-300',
        link: 'focus-visible:ring-2 focus-visible:ring-gray-100 dark:focus-visible:ring-slate-400',
      },
    },
  },
  defaultVariants: {
    bgBehindCard: 'light',
  },
})

export type CardWrapperVariantsType = VariantProps<typeof cardWrapper>
