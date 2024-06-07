export const debounce = (callback: () => void, delay = 250): (() => void) => {
  let timeout: ReturnType<typeof setTimeout>

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(), delay)
  }
}
