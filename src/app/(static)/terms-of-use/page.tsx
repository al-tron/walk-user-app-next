import { Metadata, NextPage, ResolvingMetadata } from 'next'

import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'
import { getPageDataFromMarkdown } from '@/features/staticPages/utils/getPageDataFromMarkdown.util'
import { generateJsonLd } from '@/features/staticPages/utils/generateJsonLd.util'
import { generateMetaObject } from '@/features/staticPages/utils/generateMetaObject.util'

import { BasicPageLayout } from '@/components/BasicPageLayout/BasicPageLayout'
import { DateAndModifiedDate } from '@/features/staticPages/components/DateAndModifiedDate/DateAndModifiedDate'

const SLUG = { path: 'terms-of-use', const: 'TERMS' } as const
const pageContentPath = `${process.cwd()}/src/app/(static)/${SLUG.path}/${SLUG.path}-content.md`

const TermsOfUse: NextPage = async () => {
  const { title, content, date, modified } = await getPageDataFromMarkdown(pageContentPath)
  const { siteName } = await getSiteNameAndMetaDescription()

  return (
    <>
      <BasicPageLayout title={title}>
        <DateAndModifiedDate date={date!} modified={modified} />

        <div className="c-content-area" dangerouslySetInnerHTML={{ __html: content }} />
      </BasicPageLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateJsonLd({
              siteName: siteName,
              type: 'WebPage',
              title: title,
              slugConst: SLUG.const,
              date: date,
              modified: modified,
            }),
          ),
        }}
      />
    </>
  )
}

export const generateMetadata = async ({}, parent: ResolvingMetadata): Promise<Metadata> => {
  const { title } = await getPageDataFromMarkdown(pageContentPath)
  const { siteName } = await getSiteNameAndMetaDescription()
  const resolvedParent = await parent

  return generateMetaObject(siteName, title, SLUG.const, resolvedParent)
}

export default TermsOfUse
