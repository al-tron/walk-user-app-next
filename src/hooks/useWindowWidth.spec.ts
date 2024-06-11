import { renderHook, fireEvent, waitFor } from '@testing-library/react'

import { useWindowWidth } from './useWindowWidth.hook'

const customGlobal: any = global

describe('useWindowWidth.hook', () => {
  beforeEach(() => {
    customGlobal.innerWidth = 1024
  })

  it('Should correct value for initial window width and after viewport resize event', async () => {
    const { result } = renderHook(() => useWindowWidth())

    expect(result.current[0]).toEqual(1024)

    customGlobal.innerWidth = 900
    fireEvent(customGlobal, new Event('resize'))

    await waitFor(() => expect(result.current[0]).toEqual(900))
  })
})
