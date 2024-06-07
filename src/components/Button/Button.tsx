'use client'

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { useDarkBgRipple } from '@/hooks/useRipple.hook'

import { button, ButtonVariantsType } from './Button.styles'

export const Button = <TElement extends ElementType = 'button'>({
  as,
  children,
  variants,
  className,
  disableRippleEffect = false,
  ...props
}: ButtonProps<TElement>) => {
  const [darkBgRippleRef, darkBgRippleEvent] = useDarkBgRipple({ disabled: disableRippleEffect })

  const Element = as || 'button'

  return (
    <Element
      className={button({ ...variants, className: className })}
      ref={darkBgRippleRef}
      onMouseDown={darkBgRippleEvent}
      {...props}
    >
      {children}
    </Element>
  )
}

type ButtonProps<TElement extends ElementType> = {
  as?: TElement
  children: ReactNode
  variants?: ButtonVariantsType
  className?: string
  disableRippleEffect?: boolean
} & ComponentPropsWithoutRef<TElement>
