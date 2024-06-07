import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'c-animation-medium text-md relative inline-flex items-center justify-center shadow hover:shadow-lg focus:outline-0 focus:ring-0 focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-70 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 dark:brightness-90 xxs:text-lg',
  variants: {
    color: {
      primary:
        'bg-brand-light text-gray-50 hover:bg-brand hover:text-white focus:bg-brand-light focus:text-white focus:hover:bg-brand focus:hover:text-white focus-visible:bg-brand focus-visible:ring-brand-lightest/70 disabled:hover:bg-brand-light data-[disabled]:hover:bg-brand-light',
      destructive:
        'bg-red-500 text-gray-50 hover:bg-red-600 hover:text-white focus:bg-red-500 focus:text-white focus:hover:bg-red-600 focus:hover:text-white focus-visible:bg-red-600 focus-visible:ring-red-500/70 disabled:hover:bg-red-500 data-[disabled]:hover:bg-red-500',
      apocalyptic:
        'bg-gray-900 text-gray-50 hover:bg-black hover:text-white focus:bg-gray-900 focus:text-white focus:hover:bg-black focus:hover:text-white focus-visible:bg-black focus-visible:ring-gray-900/70 disabled:hover:bg-gray-900 data-[disabled]:hover:bg-gray-900',
    },
    rounded: {
      gentle: 'rounded-lg',
      full: 'rounded-full',
    },
    form: {
      fixedSquare: 'h-11 w-11',
      content: 'px-8 py-3.5',
      fullWidth: 'w-full px-8 py-3.5',
    },
  },
  defaultVariants: {
    color: 'primary',
    rounded: 'gentle',
    form: 'content',
  },
})

export type ButtonVariantsType = VariantProps<typeof button>
