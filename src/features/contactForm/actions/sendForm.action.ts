'use server'

import sendgrid from '@sendgrid/mail'

import { ContactFormSchema, ContactFormType } from '../contactForm.types'

sendgrid.setApiKey(String(process.env.SENDGRID_API_KEY))

export const sendForm = async (data: ContactFormType, contactEmail: string) => {
  try {
    const { name, email, subject, message } = ContactFormSchema.parse(data)

    const messageHtmlRemoved = message.replace(/<[^>]*>/g, '')
    const messageWithLineBreaks = messageHtmlRemoved.replace(/(?:\r\n|\r|\n)/g, '<br>')

    await sendgrid.send({
      to: contactEmail,
      from: contactEmail,
      replyTo: email,
      subject: subject || 'No subject provided',
      html: `
        Name: ${name}<br />
        Email: ${email}<br /><br />
        Message: <br /><br />
        ${messageWithLineBreaks}
      `,
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
