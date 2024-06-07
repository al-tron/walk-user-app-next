import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'The "Name" field is required').max(64, 'The "Name" field cannot exceed 64 characters'),
  lastName: z.string().max(0),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().max(256, 'The "Subject" field cannot exceed 256 characters'),
  message: z
    .string()
    .min(1, 'The "Message" field is required')
    .max(4096, 'The "Message" field cannot exceed 4096 characters'),
})

export type ContactFormType = z.infer<typeof ContactFormSchema>
