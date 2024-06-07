import { useEffect, useState } from 'react'

import { debounce } from '@/utils/debounce.util'

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
