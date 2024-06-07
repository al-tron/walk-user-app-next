import { ButtonHTMLAttributes } from 'react'

import { toggleMenuButton } from './ToggleMenuButton.styles'

export const ToggleMenuButton = ({ isMenuOpen, toggleMenu, className, ...props }: ToggleMenuButtonProps) => {
  const rectangles = [
    { class: isMenuOpen ? 'rotate-45 translate-x-5 -translate-y-1' : '', yPosition: 0 },
    { class: isMenuOpen ? 'opacity-0' : '', yPosition: 30 },
    { class: isMenuOpen ? '-rotate-45 -translate-x-8 translate-y-6' : '', yPosition: 60 },
  ]

  const { button, svg } = toggleMenuButton({ isMenuOpen: isMenuOpen })

  return (
    <button className={button({ className: className })} onClick={toggleMenu} {...props}>
      <svg className={svg()} viewBox="0 0 100 70" width="40" height="42">
        {rectangles.map((rectangle) => (
          <rect
            className={rectangle.class}
            y={rectangle.yPosition}
            width="100"
            height="12"
            rx="6"
            key={`nav-toggle-rect-${rectangle.yPosition}`}
          ></rect>
        ))}
      </svg>

      <span className="sr-only">{`${isMenuOpen ? 'Close' : 'Open'} Navigation`}</span>
    </button>
  )
}

type ToggleMenuButtonProps = {
  isMenuOpen: boolean
  toggleMenu: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>
