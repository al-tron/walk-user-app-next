import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useConditionalKeydown } from './useConditionalKeydown.hook'

describe('useConditionalKeydown.hook', () => {
  let keyboardEventCode: KeyboardEvent['code']
  let callback: jest.Mock
  let condition: boolean

  beforeEach(() => {
    keyboardEventCode = 'Escape'
    callback = jest.fn()
    condition = true
  })

  it('Should add event listener when condition is true and then remove it on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() => useConditionalKeydown({ keyboardEventCode, callback, condition }))

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('Should remove event listener when condition is false', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    renderHook((condition) => useConditionalKeydown({ keyboardEventCode, callback, condition }), {
      initialProps: false,
    })

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('Should execute the callback when condition is true and correct key is pressed', async () => {
    const user = userEvent.setup()

    renderHook(() => useConditionalKeydown({ keyboardEventCode, callback, condition }))

    await user.keyboard('[Escape]')

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('Should not call the callback when condition is false', async () => {
    const user = userEvent.setup()

    renderHook((condition) => useConditionalKeydown({ keyboardEventCode, callback, condition }), {
      initialProps: false,
    })

    await user.keyboard('[Escape]')

    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('Should not call the callback when condition is true but wrong key is pressed', async () => {
    const user = userEvent.setup()

    renderHook(() => useConditionalKeydown({ keyboardEventCode, callback, condition }))

    await user.keyboard('[Shift]')

    expect(callback).toHaveBeenCalledTimes(0)
  })
})
