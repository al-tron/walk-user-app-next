import type { Metadata, NextPage, ResolvingMetadata } from 'next'

import { z } from 'zod'

import { gqlClient } from '@/lib/gqlClient'
import { contactEmailQuery } from '@/features/contactForm/contactForm.graphs'

import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'
import { getPageDataFromMarkdown } from '@/features/staticPages/utils/getPageDataFromMarkdown.util'
import { generateJsonLd } from '@/features/staticPages/utils/generateJsonLd.util'
import { generateMetaObject } from '@/features/staticPages/utils/generateMetaObject.util'

import { BasicPageLayout } from '@/components/BasicPageLayout/BasicPageLayout'
import { ContactForm } from '@/features/contactForm/components/ContactForm/ContactForm'

const SLUG = { path: 'contact', const: 'CONTACT' } as const
const pageContentPath = `${process.cwd()}/src/app/(static)/${SLUG.path}/${SLUG.path}-content.md`

const Contact: NextPage = async () => {
  const contactEmail = await getContactEmail()
  const { title, content } = await getPageDataFromMarkdown(pageContentPath)
  const { siteName } = await getSiteNameAndMetaDescription()

  return (
    <>
      <BasicPageLayout title={title}>
        <div className="c-content-area">
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <ContactForm contactEmail={contactEmail} />
      </BasicPageLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(siteName, 'ContactPage', title, SLUG.const)),
        }}
      />
    </>
  )
}

const getContactEmail = async () => {
  const ContactEmailSchema = z.object({ adminEmail: z.string().email() })
  const { adminEmail } = await gqlClient(contactEmailQuery, ContactEmailSchema)

  return adminEmail
}

export const generateMetadata = async ({}, parent: ResolvingMetadata): Promise<Metadata> => {
  const { title } = await getPageDataFromMarkdown(pageContentPath)
  const { siteName } = await getSiteNameAndMetaDescription()
  const resolvedParent = await parent

  return generateMetaObject(siteName, title, SLUG.const, resolvedParent)
}

export default Contact
