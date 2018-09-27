const { expect } = require('chai')
const { generateDaysMap } = require('../utils/routine-logic/Routine/helpers')

const sample1 = [{
  day: 'Monday',
  periods: 4,
}, {
  day: 'Tuesday',
  periods: 3,
}]

const sample1Result = {
  Monday: {
    1: null, 2: null, 3: null, 4: null
  },
  Tuesday: {
    1: null, 2: null, 3: null
  }
}

describe('Generate days map', () => {
  it('should make proper maps', () => {
    expect(generateDaysMap(sample1)).to.deep.equal(sample1Result)
  })
})
