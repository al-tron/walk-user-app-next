import fs from 'fs'

import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

import { BasicPageResponseSchema, BasicPageResponseType } from '@/types/types'
import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'

export const getPageDataFromMarkdown = async (pageContentPath: string) => {
  const { siteName } = await getSiteNameAndMetaDescription()
  const { data, content } = matter(fs.readFileSync(pageContentPath, 'utf-8'))

  const contentWithSiteName = content.replaceAll('{{SITE_NAME}}', siteName)
  const processedContent = await remark().use(remarkHtml).process(contentWithSiteName)
  const contentHtml = processedContent.toString()

  const page: BasicPageResponseType = {
    ...(data as Omit<BasicPageResponseType, 'content'>),
    content: contentHtml,
  }

  return BasicPageResponseSchema.parse(page)
}
