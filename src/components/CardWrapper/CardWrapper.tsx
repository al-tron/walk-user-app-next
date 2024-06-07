'use client'

import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'

import Link from 'next/link'

import { LIGHT_THEME, useDarkModeContext } from '@/context/useDarkMode.context'
import { useDarkBgRipple, useLightBgRipple } from '@/hooks/useRipple.hook'

import { cardWrapper, CardWrapperVariantsType } from './CardWrapper.styles'

export const CardWrapper = <TElement extends ElementType = 'div'>({
  as,
  href,
  children,
  variants,
  className,
  ...props
}: CardWrapperProps<TElement>) => {
  const darkModeContext = useDarkModeContext()

  const [darkBgRippleRef, darkBgRippleEvent] = useDarkBgRipple()
  const [lightBgRippleRef, lightBgRippleEvent] = useLightBgRipple()

  const showLightBgRipple = darkModeContext?.displayedTheme === LIGHT_THEME

  const Element = as || 'div'

  const { element, link } = cardWrapper(variants)

  return (
    <Element className={element({ className: className })} {...props}>
      <Link
        className={link()}
        href={href}
        ref={showLightBgRipple ? lightBgRippleRef : darkBgRippleRef}
        onMouseDown={showLightBgRipple ? lightBgRippleEvent : darkBgRippleEvent}
      >
        {children}
      </Link>
    </Element>
  )
}

type CardWrapperProps<TElement extends ElementType> = {
  as?: TElement
  href: string
  children: ReactElement
  variants?: CardWrapperVariantsType
  className?: string
} & ComponentPropsWithoutRef<TElement>
