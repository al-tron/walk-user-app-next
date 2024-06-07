import { OptionsWrapper } from '../OptionsWrapper/OptionsWrapper'

export const ToggleSwitch = ({
  labelText,
  id,
  description,
  checkedOptionLabel,
  uncheckedOptionLabel,
  isChecked,
  tabIndex,
  onChange,
  wrapperClasses,
  disabled,
}: ToggleSwitchProps) => {
  return (
    <OptionsWrapper
      wrapperTag="label"
      labelText={labelText}
      labelHtmlFor={id}
      wrapperClasses={wrapperClasses}
      disabled={disabled}
    >
      <>
        <input
          id={id}
          role="switch"
          aria-describedby={`${id}-description`}
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          tabIndex={tabIndex}
          onChange={onChange}
          disabled={disabled}
        />

        <div className="relative h-6 w-11 rounded-full bg-stone-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-lightest peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:bg-stone-400 peer-focus:outline-none peer-focus:peer-checked:bg-brand-light dark:bg-slate-600 dark:brightness-90 dark:after:border-slate-200 dark:after:bg-slate-200 dark:after:peer-checked:bg-slate-100 dark:peer-focus:bg-slate-500 dark:after:peer-focus:border-slate-100 dark:after:peer-focus:bg-slate-100 dark:peer-checked:peer-focus:bg-brand-lightest"></div>

        <span className="ml-3 text-xs" id={`${id}-description`} data-testid="toggle-switch-description">
          <span className="sr-only">{description}</span>

          {isChecked ? checkedOptionLabel : uncheckedOptionLabel}
        </span>
      </>
    </OptionsWrapper>
  )
}

type ToggleSwitchProps = {
  labelText?: string
  id: string
  description: string
  checkedOptionLabel: string
  uncheckedOptionLabel: string
  isChecked: boolean
  tabIndex: 0 | -1
  onChange: () => void
  wrapperClasses?: string
  disabled?: boolean
}
