const { expect } = require('chai')
const { generateDaysMap, flattenDays, generateDaysFlatMap } = require('../utils/routine-logic/helpers')

const sample1 = [{
  day: 'Monday',
  periods: 2,
}, {
  day: 'Tuesday',
  periods: 1,
}]

const sample1Result = {
  Monday: {
    1: null, 2: null
  },
  Tuesday: {
    1: null
  }
}

const sample1ResultFlat = [{
  day: 'Monday',
  period: 1
}, {
  day: 'Monday',
  period: 2
}, {
  day: 'Tuesday',
  period: 1
}]

const sample1ResultFlatDays = [{
  day: 'Monday',
  periods: [1, 2]
}, {
  day: 'Tuesday',
  periods: [1]
}]

describe('Generate days map', () => {
  it('should make proper maps', () => {
    expect(generateDaysMap(sample1)).to.deep.equal(sample1Result)
  })
  it('should make proper maps', () => {
    expect(flattenDays(sample1)).to.deep.equal(sample1ResultFlat)
  })
  it('should make proper flat maps', () => {
    expect(generateDaysFlatMap(sample1)).to.deep.equal(sample1ResultFlatDays)
  })
})
