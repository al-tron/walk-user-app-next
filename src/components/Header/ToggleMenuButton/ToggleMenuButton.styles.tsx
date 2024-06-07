import { tv } from 'tailwind-variants'

export const toggleMenuButton = tv({
  slots: {
    button: 'relative z-20 -mr-1.5 rounded-lg px-1.5 py-1 focus:outline-0',
    svg: 'dark:opacity-90',
  },
  variants: {
    isMenuOpen: {
      true: {
        button: 'focus-visible:bg-stone-500/10 dark:focus-visible:bg-slate-700',
        svg: 'fill-stone-500 dark:fill-logo',
      },
      false: {
        button: 'focus-visible:bg-logo/10',
        svg: 'fill-logo',
      },
    },
  },
})
