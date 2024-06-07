export const DateAndModifiedDate = ({ date, modified }: DateAndModifiedDateProps) => {
  if (!date && !modified) return null

  const dateObject = date ? new Date(date) : null
  const modifiedObject = modified ? new Date(modified) : null

  const dateAndModified = [
    dateObject && { label: 'Published', value: dateObject },
    modifiedObject && { label: 'Last updated', value: modifiedObject },
  ].filter((item) => item !== null) as { label: string; value: Date }[]

  // If both dates exist make sure that the modified date is after the published date
  if (dateObject && modifiedObject && dateObject.getTime() > modifiedObject.getTime()) {
    throw new Error('"date" should not be earlier than "modified"')
  }

  return (
    <div className="c-content-area mb-5 border-b border-gray-300 pb-5 text-sm dark:border-slate-600 sm:text-base">
      {dateAndModified.map(({ label, value }) => (
        <div key={`static-page-date-${label}`}>
          {`${label}: `}
          <span
            dangerouslySetInnerHTML={{
              __html: `<strong>${new Date(value).toLocaleDateString(process.env.APP_LOCALE)}</strong>`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

type DateAndModifiedDateProps = {
  date: string
  modified?: string
}
