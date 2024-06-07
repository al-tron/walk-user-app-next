'use client'

import { ReactElement } from 'react'

import { SORT_ORDER_DEFAULT } from '../../baggables.consts'
import { ToggleCheckedOptionLabel, SortByType, SortOrderType, ToggleUncheckedOptionLabel } from '../../baggables.types'

import { capitaliseWords } from '@/utils/capitaliseWords.util'

import { SelectBox } from '@/components/userInputs/SelectBox/SelectBox'
import { TextInput } from '@/components/userInputs/TextInput/TextInput'
import { ToggleSwitch } from '@/components/userInputs/ToggleSwitch/ToggleSwitch'

export const BaggablesFiltersUi = ({
  baggableTypeName,
  searchTerm,
  sortBy,
  sortOrder,
  sortByIcon,
  selectBoxOptions,
  toggleCheckedOptionLabel,
  toggleUncheckedOptionLabel,
  handleSearch,
  handleSortBy,
  handleListOrder,
  handleClearInput,
  disabled,
}: BaggablesFiltersUiProps) => {
  return (
    <section className="mb-5 flex w-full flex-col-reverse gap-2 border-y border-gray-300 py-2 dark:border-slate-700 md:flex-row">
      <h3 className="sr-only">{`Search and sort the ${baggableTypeName.toLowerCase()} list`}</h3>

      <TextInput
        name={`Search ${baggableTypeName}...`}
        onChange={(event) => {
          handleSearch && handleSearch(event.target.value)
        }}
        handleClearInput={handleClearInput}
        inputValue={searchTerm}
        wrapperClasses="flex grow"
        inputClasses="grow"
        role="searchbox"
        disabled={disabled}
        fixedHeight
        withResetCross
      />

      <div className="flex flex-col gap-2 xs:flex-row">
        <SelectBox
          options={selectBoxOptions}
          icon={sortByIcon}
          text={`Sort by: ${capitaliseWords(sortBy)} `}
          id="sort-by-field-select"
          value={sortBy}
          onChange={(event) => {
            handleSortBy && handleSortBy(event.target.value as SortByType)
          }}
          tabIndex={0}
          wrapperClasses="grow md:w-56"
          ariaLabel={`Choose how to sort the ${baggableTypeName} list`}
          disabled={disabled}
          smallText
        />

        <ToggleSwitch
          id="sort-order-toggle"
          description={`Set the sort order of the ${baggableTypeName.toLocaleLowerCase()} list`}
          checkedOptionLabel={toggleCheckedOptionLabel}
          uncheckedOptionLabel={toggleUncheckedOptionLabel || ''}
          isChecked={sortOrder === SORT_ORDER_DEFAULT}
          tabIndex={0}
          onChange={() => {
            handleListOrder && handleListOrder()
          }}
          wrapperClasses="grow md:w-44"
          disabled={disabled}
        />
      </div>
    </section>
  )
}

type BaggablesFiltersCommonProps = {
  baggableTypeName: string
  sortBy: SortByType
  sortOrder: SortOrderType
  sortByIcon: ReactElement
  toggleCheckedOptionLabel: ToggleCheckedOptionLabel
  handleClearInput?: () => void
}

type FallbackBaggablesFiltersUiProps = {
  searchTerm?: string
  toggleUncheckedOptionLabel?: ToggleUncheckedOptionLabel
  selectBoxOptions?: {
    name: string
    value: string
  }[]
  handleSearch?: never
  handleSortBy?: never
  handleListOrder?: never
  handleClearInput?: never
  disabled: true
} & BaggablesFiltersCommonProps

type InteractiveBaggablesFiltersUi = {
  searchTerm: string
  toggleUncheckedOptionLabel: ToggleUncheckedOptionLabel
  selectBoxOptions: {
    name: string
    value: string
  }[]
  handleSearch: (eventTargetValue: string) => void
  handleSortBy: (eventTargetValue: SortByType) => void
  handleListOrder: () => void
  handleClearInput: () => void
  disabled?: never
} & BaggablesFiltersCommonProps

type BaggablesFiltersUiProps = FallbackBaggablesFiltersUiProps | InteractiveBaggablesFiltersUi
