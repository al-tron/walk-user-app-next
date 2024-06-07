import Link from 'next/link'

import { PageRoutes } from '@/consts/routes'

import { getSiteNameAndMetaDescription } from '@/utils/getSiteNameAndMetaDescription.util'

import { Container } from '@/components/Container/Container'

const FOOTER_LINKS = [
  { label: 'Terms of Use', path: PageRoutes.TERMS },
  { label: 'Privacy Policy', path: PageRoutes.PRIVACY },
]

const year = new Date().getFullYear()

export const Footer = async () => {
  const { siteName } = await getSiteNameAndMetaDescription()

  return (
    <footer className="w-full bg-gray-800 py-14 dark:border-t dark:border-slate-700 dark:bg-slate-800">
      <Container className="flex flex-col justify-center text-center text-xs text-gray-100 dark:text-slate-200 xxs:text-sm lg:flex-row lg:justify-between">
        <p className="mb-2 lg:mb-0" data-testid="footer-copyright">{`© ${siteName} ${year}. All Rights Reserved.`}</p>

        <ul>
          {FOOTER_LINKS.map((link) => (
            <li className="mr-3 inline-block last:mr-0 lg:mr-5" key={`footer-links-${link.label}`}>
              <Link className="outline-0 hover:underline focus-visible:underline" href={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
