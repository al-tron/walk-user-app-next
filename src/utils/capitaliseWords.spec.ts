import { capitaliseWords } from './capitaliseWords.util'

it('Returns single word string with first letter capitalised', () => {
  expect(capitaliseWords('scarEmonGerEr') === 'Scaremongerer').toBe(true)
})

it('Returns multiple word string with first letter of each word capitalised', () => {
  expect(capitaliseWords('hello My naMe is DAVE') === 'Hello My Name Is Dave').toBe(true)
})
