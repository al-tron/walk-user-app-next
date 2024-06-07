export const capitaliseWords = (string: string) => string.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
