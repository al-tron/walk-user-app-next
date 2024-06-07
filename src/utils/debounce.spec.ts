import { debounce } from './debounce.util'

describe('debounce.util', () => {
  let callback: jest.Mock

  beforeEach(() => {
    callback = jest.fn()
    jest.useFakeTimers()
  })

  it('Should execute the callback after default 250ms when no delay argument is passed', () => {
    const debouncedCallback = debounce(callback)
    debouncedCallback()

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(250)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('Should execute the callback after 500ms when delay argument is passed', () => {
    const debouncedCallback = debounce(callback, 500)
    debouncedCallback()

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
