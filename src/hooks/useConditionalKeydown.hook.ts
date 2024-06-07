import { useEffect } from 'react'

/**
 * A custom React hook that conditionally executes a callback when a certain key is pressed and a condition is true.
 * Useful for closing a modal or sliding menu when a user presses the escape key.
 *
 * @param keyboardEventCode - The keyboard event code to listen for. Eg: 'Escape', to listen for the escape key.
 * @param condition - A condition that controls whether the event listeners for detecting keydown are active. This is
 * so that the event listeners only get added when they are actually needed, eg: When the modal is open.
 * @param callback - The callback to be executed when the user presses the key and the condition is true. Eg: The modal
 * is open therefore pressing the escape key should close it.
 */
export const useConditionalKeydown = ({ keyboardEventCode, condition, callback }: UseConditionalKeydownParams) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      event.code === keyboardEventCode && condition && callback()
    }

    condition
      ? document.addEventListener('keydown', keyDownHandler)
      : document.removeEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [condition, callback, keyboardEventCode])
}

type UseConditionalKeydownParams = {
  keyboardEventCode: KeyboardEvent['code']
  condition: boolean
  callback: () => void
}
