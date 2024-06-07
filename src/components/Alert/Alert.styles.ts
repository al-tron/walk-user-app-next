import { tv, type VariantProps } from 'tailwind-variants'

export const alert = tv({
  slots: {
    main: 'inline-flex w-full items-center rounded-lg border p-4 text-base dark:brightness-90',
    content: 'mx-3 flex flex-col justify-center',
    headlineStyles: 'text-base',
    descriptionStyles: 'mt-1.5 border-t pt-1.5 text-sm',
    button: 'ml-auto box-content h-6 min-h-6 w-6 min-w-6 rounded border-none focus-visible:outline-current',
  },
  variants: {
    type: {
      error: {
        main: 'border-red-300 bg-red-100 text-red-700',
        descriptionStyles: 'border-red-300',
      },
      info: {
        main: 'border-blue-300 bg-blue-100 text-blue-700',
        descriptionStyles: 'border-blue-300',
      },
      success: {
        main: 'border-green-300 bg-green-100 text-green-700',
        descriptionStyles: 'border-green-300',
      },
      warning: {
        main: 'border-orange-300 bg-orange-100 text-orange-700',
        descriptionStyles: 'border-orange-300',
      },
    },
  },
})

type AlertVariantsType = VariantProps<typeof alert>

// Currently no way to mark variants as required in tailwind-variants, so have to do this for now.
export type AlertVariantsRequriedType = Omit<AlertVariantsType, 'type'> & Required<Pick<AlertVariantsType, 'type'>>
