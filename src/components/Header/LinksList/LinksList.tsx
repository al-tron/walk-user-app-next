import Link from 'next/link'

import { PageRoutes } from '@/consts/routes'

import { useDarkBgRipple } from '@/hooks/useRipple.hook'
import { NavListItemsType } from '../Header.types'

export const LinksList = ({ closeMenu, isMenuOpen, isMobileNav, dynamicNavItems }: LinksListProps) => {
  const navLinks = [
    { label: 'Home', path: PageRoutes.HOME },
    ...dynamicNavItems,
    { label: 'Contact', path: PageRoutes.CONTACT },
  ]

  return (
    <nav role="navigation">
      <ul className="lg:mr-4">
        {navLinks.map((link) => (
          <li className="lg:mr-2 lg:inline-block last:lg:mr-0" key={`main-nav-links-list-${link.label}`}>
            <LinkItem path={link.path} closeMenu={closeMenu} isMenuOpen={isMenuOpen} isMobileNav={isMobileNav}>
              {link.label}
            </LinkItem>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const LinkItem = ({ path, closeMenu, isMenuOpen, isMobileNav, children }: LinkItemProps) => {
  const [darkBgRippleRef, darkBgRippleEvent] = useDarkBgRipple({ disabled: isMobileNav })

  return (
    <Link
      className="c-animation-quick block border-b border-gray-300 p-5 text-lg text-gray-700 hover:no-underline focus:no-underline focus:outline-0 focus-visible:bg-stone-500/10 focus-visible:text-gray-800 dark:border-slate-700 dark:text-slate-200 dark:focus-visible:bg-slate-700 dark:focus-visible:text-slate-100 lg:rounded-lg lg:border-none lg:px-6 lg:py-3.5 lg:text-logo lg:hover:bg-logo/10 lg:hover:text-white lg:focus:bg-logo/10 lg:focus:text-white dark:lg:text-slate-200 dark:lg:hover:text-slate-50 lg:dark:focus-visible:bg-logo/10 dark:lg:focus-visible:text-white"
      href={path}
      onClick={closeMenu}
      ref={darkBgRippleRef}
      onMouseDown={darkBgRippleEvent}
      tabIndex={isMobileNav && !isMenuOpen ? -1 : 0}
    >
      {children}
    </Link>
  )
}

type LinksListProps = {
  closeMenu: () => void
  isMenuOpen: boolean
  isMobileNav: boolean
  dynamicNavItems: NavListItemsType
}

type LinkItemProps = {
  path: string
  closeMenu: () => void
  isMenuOpen: boolean
  isMobileNav?: boolean
  children: string
}
