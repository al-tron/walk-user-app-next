'use client'

import { AriaRole, ChangeEvent, useEffect, useRef } from 'react'

import clsx from 'clsx'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import { Alert } from '@/components/Alert/Alert'

export const TextInput = ({
  name,
  errorMessage,
  disabled,
  register,
  type = 'text',
  tabIndex = 0,
  autoComplete,
  onChange,
  inputValue,
  fixedHeight,
  inputClasses,
  wrapperClasses,
  role,
  withResetCross,
  handleClearInput,
}: TextInputProps) => {
  const textInputRef = useRef<HTMLTextAreaElement | HTMLInputElement>()

  const isTypeTextArea = type === 'textarea'
  const isTypeEmail = type === 'email'

  const Tag = isTypeTextArea ? 'textarea' : 'input'
  const inputType = !isTypeTextArea ? type : undefined
  const inputMode = type === 'email' ? type : undefined

  // Without this the browser retains any text inside the search field when you click on a link to the same route you
  // are already on. It retains the text in the input despite the search param clearing and the list reseting.
  useEffect(() => {
    if (!inputValue && textInputRef.current?.value) {
      textInputRef.current.value = ''
    }
  }, [inputValue])

  const autoCompleteValue = () => {
    if (isTypeTextArea) return 'off'

    if (autoComplete) {
      return autoComplete
    } else if (isTypeEmail) {
      return type
    } else {
      return 'off'
    }
  }

  return (
    <>
      <div
        className={clsx(
          'relative text-gray-700 dark:text-slate-200',
          { 'flex items-center justify-end': withResetCross },
          wrapperClasses,
        )}
        data-testid="text-input-wrapper"
      >
        <Tag
          type={inputType}
          inputMode={inputMode}
          autoComplete={autoCompleteValue()}
          placeholder={name}
          className={clsx(
            'c-animation-quick z-0 block rounded-lg border border-gray-300 px-4 py-3 text-lg outline-0 focus:border-sky-500 focus:bg-white focus:ring-0 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-600 dark:bg-slate-700 dark:focus:border-slate-400 dark:focus:bg-slate-700',
            {
              'mb-4 border-red-300 focus:border-red-300 dark:border-red-300 dark:focus:border-red-300': errorMessage,
            },
            { 'h-64': isTypeTextArea },
            { 'h-12': fixedHeight },
            { 'pr-11': withResetCross },
            inputClasses,
          )}
          disabled={disabled}
          aria-label={name}
          role={role}
          tabIndex={tabIndex}
          onChange={(event) => {
            onChange && onChange(event)
          }}
          defaultValue={inputValue}
          ref={textInputRef}
          {...register}
        />

        {withResetCross && inputValue !== '' && !disabled && (
          <button
            className="group absolute h-full px-2 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-70"
            onClick={handleClearInput}
            disabled={disabled}
          >
            <XMarkIcon className="h-6 w-6 rounded fill-current ring-sky-500 group-focus-visible:ring-2 dark:ring-slate-400" />
            <span className="sr-only">Clear search field</span>
          </button>
        )}

        {errorMessage && <Alert headline={errorMessage} variants={{ type: 'error' }} ariaRole="alert" />}
      </div>
    </>
  )
}

type CommonTextInputProps = {
  name: string
  errorMessage?: string | false
  disabled?: boolean
  tabIndex?: 0 | -1
  register?: any
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  inputValue?: string
  fixedHeight?: boolean
  inputClasses?: string
  wrapperClasses?: string
  role?: AriaRole
  handleClearInput?: () => void
}

type TextInputTypeTextProps = {
  type?: 'text'
  autoComplete?: 'name'
  withResetCross?: boolean
} & CommonTextInputProps

type TextInputTextAreaProps = {
  type: 'textarea' | 'email'
  autoComplete?: never
  withResetCross?: never
} & CommonTextInputProps

type TextInputProps = TextInputTypeTextProps | TextInputTextAreaProps
