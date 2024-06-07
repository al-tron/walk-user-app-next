import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'

export const ErrorPlaceholder = ({ name, className }: ErrorPlaceholderProps) => {
  return (
    <div
      className={`${
        className || ''
      } flex flex-col items-center justify-center bg-loadingBaseColor text-gray-100 dark:bg-slate-700 dark:text-gray-800`}
      role="alert"
    >
      <XCircleIcon className="h-24 w-24" aria-hidden="true" />

      <span className="sr-only">
        {`An error occurred! The ${name} could not be loaded, please refresh to try again.`}
      </span>
    </div>
  )
}

type ErrorPlaceholderProps = {
  name: string
  className?: string
}
