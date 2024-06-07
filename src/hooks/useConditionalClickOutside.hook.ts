import { useEffect, RefObject } from 'react'

/**
 * A custom React hook that triggers a callback function when a click or touch event occurs outside of the referenced
 * HTMLElement when a certain condition is true. Useful for closing a modal or sliding menu when a user clicks outside.
 *
 * @param ref - A React ref object that refers to the HTMLElement to detect clicks outside of. Eg: A modal.
 * @param condition - A condition that controls whether the event listeners for detecting outside clicks are active.
 * This is so that the event listeners only get added when they are actually needed, eg: When the modal is open.
 * @param callback - The callback to be executed when a click or touch event occurs outside of the referenced
 * HTMLElement and the condition is true. Eg: The modal is open therefore a click outside of it should close it.
 */
export const useConditionalClickOutside = ({ ref, condition, callback }: UseConditionalClickOutsideParams) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return

      callback()
    }

    if (condition) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, condition, callback])
}

type UseConditionalClickOutsideParams = {
  ref: RefObject<HTMLElement>
  condition: boolean
  callback: () => void
}
