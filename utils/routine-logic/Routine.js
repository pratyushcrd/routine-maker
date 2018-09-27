const Component = require('../Component')
const { generateDaysMap } = require('./helpers')

/**
 * An Entity to hold routine
 * @param {Array} days In format [{day: 'Monday', periods: 8}]
 */
class Routine extends Component {
  constructor(days) {
    super()
    const routineMap = generateDaysMap(days)
    this.addToStore('routineMap', routineMap)
  }
  /**
   * Function to find if the class is free on the particular day & period
   * @param {string} day Day of week
   * @param {number} period period number of the day
   */
  isFree(day, period) {
    return !this.getFromStore('routineMap')[day][period]
  }
  /**
   * Function to find if the class is occupied on the particular day & period
   * @param {string} day Day of week
   * @param {number} period period number of the day
   */
  isOccupied(day, period) {
    return !this.isFree(day, period)
  }
  /**
   * Function to put a subject on the particular day & period
   * @param {string} day Day of week
   * @param {number} period period number of the day
   * @param {Object} subject subject object to be added
   */
  addSubject(day, period, subject) {
    const map = this.getFromStore('routineMap')
    if (map[day] === undefined || map[day][period] === undefined) {
      throw Error('Not a valid day or period')
    }
    if (this.isOccupied(day, period)) {
      throw Error(`Class not free on ${day} period ${period}`)
    }
    // adding the subject
    map[day][period] = subject
    return this
  }
}

module.exports = Routine
