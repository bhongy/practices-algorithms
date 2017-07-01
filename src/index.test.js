// @flow

const numToString = require('.')

describe('Num To String', () => {
  it('should work', () => {
    expect(numToString(2.53)).toBe('2.5')
  })
})
