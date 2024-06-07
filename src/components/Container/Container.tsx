import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { container, ContainerVariantsType } from './Container.styles'

export const Container = <TElement extends ElementType = 'div'>({
  as,
  children,
  variants,
  className,
  ...props
}: ContainerProps<TElement>) => {
  const Element = as || 'div'

  return (
    <Element className={container({ ...variants, className: className })} {...props}>
      {children}
    </Element>
  )
}

type ContainerProps<TElement extends ElementType> = {
  as?: TElement
  children: ReactNode
  variants?: ContainerVariantsType
  className?: string
} & ComponentPropsWithoutRef<TElement>
