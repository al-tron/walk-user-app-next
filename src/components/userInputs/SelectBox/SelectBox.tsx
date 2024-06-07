import { ChangeEvent, ReactElement } from 'react'

import clsx from 'clsx'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import { OptionsWrapper } from '../OptionsWrapper/OptionsWrapper'

export const SelectBox = ({
  labelText,
  options,
  icon,
  text,
  id,
  value,
  onChange,
  tabIndex,
  wrapperClasses,
  smallText,
  ariaLabel,
  disabled,
}: SelectBoxProps) => {
  return (
    <OptionsWrapper labelText={labelText} labelHtmlFor={id} wrapperClasses={wrapperClasses} disabled={disabled}>
      <>
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center">
            {icon}
            <span className={clsx('mx-2', { 'text-xs': smallText })}>{text}</span>
          </span>

          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        </div>

        <select
          id={id}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none border border-gray-300 bg-gray-50 px-3 text-lg text-gray-700 opacity-0 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          value={value}
          onChange={onChange}
          tabIndex={tabIndex}
          aria-label={ariaLabel}
          disabled={disabled}
        >
          {options?.map(({ name, value }) => (
            <option value={value} key={`select-box-option-${value}`}>
              {name}
            </option>
          ))}
        </select>
      </>
    </OptionsWrapper>
  )
}

type SelectBoxProps = {
  labelText?: string
  options?: {
    name: string
    value: string
  }[]
  icon: ReactElement
  text: string
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  tabIndex: 0 | -1
  wrapperClasses?: string
  smallText?: boolean
  ariaLabel?: string
  disabled?: boolean
}
