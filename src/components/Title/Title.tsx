import { ReactNode } from 'react'

import clsx from 'clsx'

const TITLE_STYLES = {
  xl: 'text-4xl sm:text-5xl lg:text-6xl',
  lg: 'text-2xl xs:text-3xl sm:text-4xl lg:text-5xl',
  md: 'text-2xl xs:text-3xl sm:text-4xl',
  sm: 'text-xl xxs:text-2xl md:text-3xl',
  xs: 'text-md xs:text-xl',
  line: 'flex items-center whitespace-nowrap text-lg xs:text-xl',
}
const LINE_BEFORE = `before:mr-3 before:h-[3px] before:w-full before:rounded-l-sm before:bg-current before:opacity-[0.85] before:content-[''] xs:before:mr-4 xs:before:h-[4px]`
const LINE_AFTER = `after:ml-3 xs:after:ml-4 after:content-[''] after:h-[3px] after:w-full after:rounded-r-sm after:bg-current after:opacity-[0.85] xs:after:h-[4px]`
const ADDITIONAL_LINE_STYLES = {
  center: `mx-auto px-5 ${LINE_BEFORE} ${LINE_AFTER}`,
  left: `mr-0 ${LINE_AFTER}`,
  right: `ml-0 ${LINE_BEFORE}`,
}

export const Title = ({ children, level, align, style, classes, shadow, lightBg }: TitleProps) => {
  const Tag = ('h' + level) as keyof JSX.IntrinsicElements

  const alignClass = `text-${align}`
  const fontColor = `${lightBg ? 'text-gray-700 dark:text-slate-300' : 'text-gray-50 dark:text-slate-200'}`

  const mainStyles = style === 'line' ? `${TITLE_STYLES[style]} ${ADDITIONAL_LINE_STYLES[align]}` : TITLE_STYLES[style]

  const dataTextAttribute = shadow && typeof children === 'string' ? { 'data-text': children } : {}

  return (
    <Tag
      className={clsx('relative z-10 font-bold', fontColor, alignClass, mainStyles, classes, {
        'c-heading-title-shadow': shadow,
      })}
      {...dataTextAttribute}
    >
      {children}
    </Tag>
  )
}

type CommonStyles = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

type CommonTitleProps = {
  level: 1 | 2 | 3 | 4
  align: 'left' | 'center' | 'right'
  classes?: string
  lightBg?: boolean
}

type shadowTrue = {
  style: CommonStyles
  children: string
  shadow: true
} & CommonTitleProps

type shadowFalse = {
  style: CommonStyles | 'line'
  children: ReactNode
  shadow?: never
} & CommonTitleProps

type TitleProps = shadowTrue | shadowFalse
