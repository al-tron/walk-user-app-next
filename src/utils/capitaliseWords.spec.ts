import { capitaliseWords } from './capitaliseWords.util'

describe('capitaliseWords.util', () => {
  it('Should return single word string with first letter capitalised', () => {
    expect(capitaliseWords('scarEmonGerEr') === 'Scaremongerer').toBe(true)
  })

  it('Should return multiple word string with first letter of each word capitalised', () => {
    expect(capitaliseWords('hello My naMe is DAVE') === 'Hello My Name Is Dave').toBe(true)
  })
})
