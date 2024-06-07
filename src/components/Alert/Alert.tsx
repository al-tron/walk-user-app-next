import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon'
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import { alert, AlertVariantsRequriedType } from './Alert.styles'

const ICON_STYLES = 'h-6 min-h-6 w-6 min-w-6'

const ALERT_THEME_ICONS = {
  info: <InformationCircleIcon className={ICON_STYLES} aria-hidden="true" data-testid="info-icon" />,
  success: <CheckCircleIcon className={ICON_STYLES} aria-hidden="true" data-testid="check-icon" />,
  warning: <ExclamationTriangleIcon className={ICON_STYLES} aria-hidden="true" data-testid="exclaimation-icon" />,
  error: <XCircleIcon className={ICON_STYLES} aria-hidden="true" data-testid="cross-icon" />,
}

export const Alert = ({
  headline,
  description,
  variants,
  closeButtonOnClick,
  closeButtonDescribeAction,
  ariaRole,
}: AlertProps) => {
  const { main, content, headlineStyles, descriptionStyles, button } = alert(variants)

  return (
    <div className={main()} role={ariaRole}>
      {ALERT_THEME_ICONS[variants.type]}

      <div className={content()}>
        <div className={headlineStyles()}>{headline}</div>

        {description && <div className={descriptionStyles()}>{description}</div>}
      </div>

      {closeButtonOnClick && closeButtonDescribeAction && (
        <button onClick={closeButtonOnClick} type="button" className={button()}>
          <XMarkIcon />

          <span className="sr-only">{closeButtonDescribeAction}</span>
        </button>
      )}
    </div>
  )
}

type CommonAlertProps = {
  headline: string
  description?: string
  variants: AlertVariantsRequriedType
}

type HasCloseAlertAction = {
  closeButtonOnClick: () => void
  closeButtonDescribeAction: string
  ariaRole: 'alertdialog' | 'dialog'
} & CommonAlertProps

type NoCloseAlertAction = {
  closeButtonOnClick?: never
  closeButtonDescribeAction?: never
  ariaRole: 'alert'
} & CommonAlertProps

type AlertProps = HasCloseAlertAction | NoCloseAlertAction
