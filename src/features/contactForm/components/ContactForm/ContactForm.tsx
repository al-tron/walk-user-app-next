'use client'

import { useState } from 'react'
import Link from 'next/link'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon'
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon'
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'

import { PageRoutes } from '@/consts/routes'
import { ContactFormSchema, ContactFormType } from '../../contactForm.types'

import { sendForm } from '../../actions/sendForm.action'

import { Button } from '@/components/Button/Button'
import { TextInput } from '@/components/userInputs/TextInput/TextInput'
import { Alert } from '@/components/Alert/Alert'

export const ContactForm = ({ contactEmail }: { contactEmail: string }) => {
  const [formApiError, setFormApiError] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    getFieldState,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormType> = async (data) => {
    const response = await sendForm(data, contactEmail)

    if (!response.success) {
      setError('root', {
        type: 'server',
        message: 'The server returned an error',
      })

      setFormApiError(true)
    }
  }

  const honeyPotError = !!errors?.lastName?.message
  const fieldsDisabled = isSubmitting || isSubmitSuccessful || formApiError || honeyPotError

  // TL;DR - react-hook-forms won't play nicely with react compiler's memoization.
  // Have to do this rather than just checking `Object.keys(errors).length > 0` because react-hook-forms doesn't seem
  // to play by react's rules when setting errors. As a result the button component wasn't getting "undisabled" after
  // the user clears errors by correctly filling out the fields after one or more errors have been displayed.
  const hasNameError = !!getFieldState('name').error
  const hasLastNameError = !!getFieldState('lastName').error
  const hasEmailError = !!getFieldState('email').error
  const hasSubjectError = !!getFieldState('subject').error
  const hasMessageError = !!getFieldState('message').error

  const buttonDisabled =
    fieldsDisabled || hasNameError || hasLastNameError || hasEmailError || hasSubjectError || hasMessageError

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-6 flex flex-col items-start gap-4 lg:mt-8"
      noValidate
    >
      <TextInput
        name="Name"
        autoComplete="name"
        errorMessage={!honeyPotError && errors?.name?.message}
        disabled={fieldsDisabled}
        register={register('name')}
        inputClasses="w-full"
        wrapperClasses="w-full"
      />

      {/** Honey pot/Anti bot field */}
      <TextInput
        name="Last Name"
        disabled={fieldsDisabled}
        register={register('lastName')}
        wrapperClasses="!absolute left-0 top-0 -z-10"
        inputClasses="disabled:!opacity-0"
        tabIndex={-1}
      />

      <TextInput
        name="Email"
        type="email"
        errorMessage={!honeyPotError && errors?.email?.message}
        disabled={fieldsDisabled}
        register={register('email')}
        inputClasses="w-full"
        wrapperClasses="w-full"
      />

      <TextInput
        name="Subject"
        errorMessage={!honeyPotError && errors?.subject?.message}
        disabled={fieldsDisabled}
        register={register('subject')}
        inputClasses="w-full"
        wrapperClasses="w-full"
      />

      <TextInput
        name="Message"
        errorMessage={!honeyPotError && errors?.message?.message}
        disabled={fieldsDisabled}
        register={register('message')}
        type="textarea"
        inputClasses="w-full"
        wrapperClasses="w-full"
      />

      <p className="c-content-area !text-xs opacity-80">
        The email address provided here is only ever used so we can respond to your enquiry.{' '}
        <br className="hidden sm:block" />
        Learn more about how we handle your data on our <Link href={PageRoutes.PRIVACY}>Privacy Policy</Link> page.
      </p>

      {(formApiError || honeyPotError) && (
        <Alert
          headline="Sorry! An error has occurred and we couldn't send your message"
          description={`Press the cross on the right to close this notification and ${
            honeyPotError ? 'reset the form' : 'try again'
          }`}
          variants={{ type: 'error' }}
          closeButtonOnClick={() => {
            setFormApiError(false)
            clearErrors()
            honeyPotError && reset()
          }}
          closeButtonDescribeAction={honeyPotError ? 'Reset form' : 'Close error message'}
          ariaRole="alertdialog"
        />
      )}

      {isSubmitSuccessful && (
        <Alert
          headline="Thank you! Your message has been sent successfully"
          description="Press the cross on the right to close this notification and reset the form"
          variants={{ type: 'success' }}
          closeButtonOnClick={() => {
            setFormApiError(false)
            reset()
          }}
          closeButtonDescribeAction="Reset form"
          ariaRole="alertdialog"
        />
      )}

      <Button disabled={buttonDisabled}>
        <>
          Send
          {isSubmitting && <ArrowPathIcon className="ml-3.5 h-5 w-5 animate-spin" />}
          {isSubmitSuccessful && <CheckCircleIcon className="ml-3.5 h-6 w-6" />}
          {(formApiError || honeyPotError) && <ExclamationTriangleIcon className="ml-3.5 h-6 w-6" />}
          {!isSubmitting && !isSubmitSuccessful && !formApiError && !honeyPotError && (
            <EnvelopeIcon className="ml-3.5 h-5 w-5" />
          )}
        </>
      </Button>
    </form>
  )
}
