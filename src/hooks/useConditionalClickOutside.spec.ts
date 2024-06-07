import { renderHook, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useConditionalClickOutside } from './useConditionalClickOutside.hook'

describe('useConditionalClickOutside.hook', () => {
  let ref: React.RefObject<HTMLDivElement>
  let callback: jest.Mock
  let condition: boolean

  beforeEach(() => {
    ref = { current: document.createElement('div') }
    callback = jest.fn()
    condition = true
  })

  it('Should add event listeners when condition is true and remove them on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() => useConditionalClickOutside({ ref, condition, callback }))

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
  })

  it('Should add event listeners when condition is true and remove them when condition changes to false', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    const { rerender } = renderHook((condition) => useConditionalClickOutside({ ref, condition, callback }), {
      initialProps: true,
    })

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))

    act(() => {
      rerender(false)
    })

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
  })

  it('Should not add event listeners when condition is false, but does add them when true and remove again', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    const { rerender } = renderHook((condition) => useConditionalClickOutside({ ref, condition, callback }), {
      initialProps: false,
    })

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))

    act(() => {
      rerender(true)
    })

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))

    act(() => {
      rerender(true)
    })

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
  })

  it('Should execute the callback when clicking outside the ref element and condition is true', async () => {
    const user = userEvent.setup()
    renderHook(() => useConditionalClickOutside({ ref, condition, callback }))

    await user.click(document.body)

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1))
  })

  it('Should not execute the callback when clicking outside the ref element and condition is false', async () => {
    const user = userEvent.setup()
    renderHook((condition) => useConditionalClickOutside({ ref, condition, callback }), { initialProps: false })

    await user.click(document.body)

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(0))
  })

  it('Should not execute the callback when clicked inside the ref element and condition is true', async () => {
    const user = userEvent.setup()
    renderHook(() => useConditionalClickOutside({ ref, condition, callback }))

    await user.click(ref.current!)

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(0))
  })

  it('Should not execute the callback when clicked inside the ref element and condition is false', async () => {
    const user = userEvent.setup()
    renderHook((condition) => useConditionalClickOutside({ ref, condition, callback }), { initialProps: false })

    await user.click(ref.current!)

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(0))
  })

  it('Should not execute the callback when clicked outside the ref element, condition is true, but no ref.current', async () => {
    const user = userEvent.setup()
    renderHook((ref) => useConditionalClickOutside({ ref, condition, callback }), { initialProps: { current: null } })

    await user.click(document.body)

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(0))
  })
})
