import { renderHook } from '@testing-library/react'

import { useConditionalFocusWithin } from './useConditionalFocusWithin.hook'

describe('useConditionalFocusWithin.hook', () => {
  it('Should set tabIndex to "0" for focusable elements when condition is true', () => {
    const ref = { current: document.createElement('div') }

    const anchorElement1 = document.createElement('a')
    const anchorElement2 = document.createElement('button')
    const anchorElement3 = document.createElement('select')

    ref.current.appendChild(anchorElement1)
    ref.current.appendChild(anchorElement2)
    ref.current.appendChild(anchorElement3)

    renderHook(() => useConditionalFocusWithin({ ref, condition: true }))

    expect(anchorElement1.tabIndex).toBe(0)
    expect(anchorElement2.tabIndex).toBe(0)
    expect(anchorElement3.tabIndex).toBe(0)
  })

  it('Should set tabIndex to "-1" for focusable elements when condition is false', () => {
    const ref = { current: document.createElement('div') }

    const anchorElement1 = document.createElement('textarea')
    const anchorElement2 = document.createElement('iframe')
    const anchorElement3 = document.createElement('audio')

    ref.current.appendChild(anchorElement1)
    ref.current.appendChild(anchorElement2)
    ref.current.appendChild(anchorElement3)

    renderHook(() => useConditionalFocusWithin({ ref, condition: false }))

    expect(anchorElement1.tabIndex).toBe(-1)
    expect(anchorElement2.tabIndex).toBe(-1)
    expect(anchorElement3.tabIndex).toBe(-1)
  })

  it('Should not do anything when ref is null and condition is true', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useConditionalFocusWithin({ ref, condition: true }))

    expect(result.current).toBe(undefined)
  })
})
