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

