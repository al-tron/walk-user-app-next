import { useEffect, useState } from 'react'

import { debounce } from '@/utils/debounce.util'

/**
 * A custom React Hook that provides the current window width. This hook listens for the 'resize' event on the window
 * object and updates the return value accordingly, the event listener is debounced to improve performance.
 *
 * @returns An array containing a single value representing the current window width.
 */
export const useWindowWidth = (): [number] => {
  const [windowWidth, setWindowWidth] = useState(0)

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth)
  })

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return [windowWidth]
}
