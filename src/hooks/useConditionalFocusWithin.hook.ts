import { useEffect, RefObject } from 'react'

/**
 * A custom React hook that conditionally sets the tabIndex attribute on all focusable elements within a referenced
 * HTMLElement. Eg: Useful for making sure that no elements within a collapsable component are focusable when said
 * component is in it's collapsed state.
 *
 * @param ref - A React ref object that refers to the HTMLElement to detect focusable elements within.
 * @param condition - A condition that controls whether the tabIndex of each focusable element is set to '0' or '-1'.
 *
 * @todo A current limitation of this hook is that it indiscriminately changes the tabIndex of all focusable elements
 * within the referenced HTMLElement. This could cause problems in instances where an element inside has a tabIndex of
 * '-1' for reasons not dictated by the condition param, as it will also get changed to '0' when the condition is true.
 * An example of this is when I attempted to apply this hook to the site sliding menu in order to not have to
 * individually manage the tabIndex of various links/buttons and user inputs. The login button had a tabIndex of '-1'
 * because the user api was not available at the time and therefore the button was disabled. However, when using this
 * hook, and expanding the menu, the tabIndex got changed to '0' and the button was focusable despite being disabled.
 */
export const useConditionalFocusWithin = ({ ref, condition }: UseConditionalFocusWithinParams) => {
  useEffect(() => {
    if (!ref.current) return

    const focusablesCollection = ref.current.querySelectorAll(
      'audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]',
    )

    if (focusablesCollection) {
      const focusableElements = Array.from(focusablesCollection)

      const setTabIndexOnAll = (focusableElements: Element[], value: '0' | '-1') => {
        focusableElements.forEach((focusableElement) => {
          focusableElement.setAttribute('tabIndex', value)
        })
      }

      condition ? setTabIndexOnAll(focusableElements, '0') : setTabIndexOnAll(focusableElements, '-1')
    }
  }, [condition, ref])
}

type UseConditionalFocusWithinParams = {
  ref: RefObject<HTMLElement>
  condition: boolean
}
