exports.generateDaysMap = days => days.reduce((acc, { day, periods }) => {
  acc[day] = Array(periods)
    .fill(1)
    .map((a, i) => a + i)
    .reduce((pAcc, val) => {
      pAcc[val] = null
      return pAcc
    }, {})
  return acc
}, {})

exports.flattenDays = days => days
  .map(({ day, periods }) => Array(periods)
    .fill(1)
    .map((a, i) => a + i)
    .map(period => ({
      day,
      period,
    }))
  ).reduce((a, b) => a.concat(b))

exports.spreadDaysOb = ({ day, periods }) => ({
  day,
  periods: Array(periods)
    .fill(1)
    .map((a, i) => a + i)
})

exports.getDaysArray = days => days.map(exports.spreadDaysOb)
