import { ReactElement } from 'react'

import clsx from 'clsx'

import { LIGHT_THEME, useDarkModeContext } from '@/context/useDarkMode.context'
import { useDarkBgSubtleRipple, useLightBgSubtleRipple } from '@/hooks/useRipple.hook'

export const OptionsWrapper = ({
  wrapperTag,
  labelText,
  labelHtmlFor,
  wrapperClasses,
  disabled,
  children,
}: LabelWrapperProps) => {
  const darkModeContext = useDarkModeContext()

  const [darkBgRippleRef, darkBgRippleEvent] = useDarkBgSubtleRipple()
  const [lightBgRippleRef, lightBgRippleEvent] = useLightBgSubtleRipple()

  const showLightBgRipple = darkModeContext?.displayedTheme === LIGHT_THEME

  const rippleEvent = () => {
    if (disabled) return
    return showLightBgRipple ? lightBgRippleEvent : darkBgRippleEvent
  }

  const Tag = wrapperTag || 'div'

  return (
    <div className="flex w-full items-center justify-between">
      {labelText && (
        <label
          className={clsx('text-sm font-bold text-gray-700 dark:text-slate-200', {
            'cursor-not-allowed opacity-70': disabled,
          })}
          htmlFor={labelHtmlFor}
          data-testid="toggle-switch-label"
        >
          {labelText}:
        </label>
      )}

      <Tag
        className={clsx(
          'relative inline-flex h-12 cursor-pointer items-center rounded-lg border border-gray-300 px-3 text-sm font-bold text-gray-700 focus-within:bg-stone-500/10 focus-within:text-gray-800 dark:border-slate-600 dark:text-slate-200 dark:focus-within:bg-slate-700 dark:focus-within:text-slate-100',
          { '!cursor-not-allowed opacity-70': disabled },
          wrapperClasses,
        )}
        data-testid="options-wrapper"
        ref={showLightBgRipple ? lightBgRippleRef : darkBgRippleRef}
        onMouseDown={rippleEvent()}
        aria-disabled={disabled}
      >
        {children}
      </Tag>
    </div>
  )
}

type CommonLabelWrapperProps = {
  wrapperTag?: 'label'
  wrapperClasses?: string
  disabled?: boolean
  children: ReactElement
}

type WithLabelText = {
  labelText: string
  labelHtmlFor: string
} & CommonLabelWrapperProps

type WithoutLabelText = {
  labelText?: never | undefined
  labelHtmlFor?: string
} & CommonLabelWrapperProps

type LabelWrapperProps = WithLabelText | WithoutLabelText
