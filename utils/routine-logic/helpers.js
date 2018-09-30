const Routine = require('./Routine')

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

exports.putRoutineInstance = function (arr, days) {
  arr.forEach(data => {
    const routine = new Routine(days)
    data.routine = routine
  })
}

exports.getSectionFinder = function getSectionFinder(sections) {
  const key = ({ className, section }) => [className, section].join('@@section@@')
  const map = sections
    .reduce((acc, section) => {
      acc[key(section)] = section
      return acc
    }, {})
  return function getSection(section) {
    return map[key(section)]
  }
}

exports.getTeacherFinder = function getTeacherFinder(teachers) {
  const map = teachers
    .reduce((acc, teacher) => {
      acc[teacher.id] = teacher
      return acc
    }, {})
  return function getTeacher({ teacherId }) {
    return map[teacherId]
  }
}

exports.getSubjectToAssign = function getSubjectToAssign(sectionFinder, teacherFinder, subjects) {
  return [0, subjects[0]]
}

const daysMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  .reduce((acc, day, idx) => {
    acc[day] = idx
    return acc
  }, {})


const daysSortFn = (a, b) => daysMap[a.day.toLowerCase()] - daysMap[b.day.toLowerCase()]

function getNextDay(days) {
  const key = ({ className, section, subject }) => [className, section, subject].join('@@')
  const daysLen = days.length
  const map = {}
  return function nextDayFn(subject) {
    const nextDay = ((map[key(subject)] === undefined ? -1 : map[key(subject)]) + 1) % daysLen
    map[key(subject)] = nextDay
    return days[nextDay]
  }
}

exports.getPeriodsAssigner = function getPeriodsAssigner(sectionFinder, teacherFinder, days) {
  days.sort(daysSortFn)
  const nextDayFn = getNextDay(days)

  return function assignPeriodToSubject(subject) {
    const section = sectionFinder(subject)
    const teacher = teacherFinder(subject)


    let isAssigned = false
    let totalIteration = 0

    while (!isAssigned) {
      const day = nextDayFn(subject)
      if (totalIteration === days.length) {
        break
      }
      totalIteration += 1
      const periods = Array(day.periods).fill(1).map((a, i) => a + i)
      for (let i = 0, ii = periods.length; i < ii; i += 1) {
        const period = periods[i]
        if (teacher.routine.isFree(day.day, period) && section.routine.isFree(day.day, period)) {
          // assign subject
          teacher.routine.addSubject(day.day, period, subject)
          section.routine.addSubject(day.day, period, subject)
          // put days details in subject
          subject.assignedDay = day.day
          subject.assignedPeriod = period
          // set subject assigned
          isAssigned = true
          // break from loop
          break
        }
      }
    }
    return isAssigned
  }
}

/**
 * Function to generate list of sections routine
 * @param {*} sections List of sections with their routine instance
 */
exports.getSectionsRoutine = function getSectionsRoutine(sections, teacherFinder) {
  return sections.map(sectionOb => {
    const { className, section } = sectionOb
    const routineMap = sectionOb.routine.getFromStore('routineMap')
    const sortedRoutine = Object.keys(routineMap)
      .map(day => ({ day }))
      // sort by day orderr
      .sort(daysSortFn)
      .map(({ day }) => {
        const routineForDay = routineMap[day]
        const periods = Object.keys(routineForDay)
          .sort((a, b) => a - b)
          .map(period => {
            if (!routineForDay[period]) {
              return undefined
            }
            const { subject } = routineForDay[period]
            return {
              subject,
              teacher: teacherFinder(routineForDay[period]).name,
              teacherId: teacherFinder(routineForDay[period]).id,
            }
          })
        return [day, periods]
      })
    return {
      className,
      section,
      routine: sortedRoutine
    }
  })
}

/**
 * Function to generate list of teachers routine
 * @param {*} teachers List of teachers with their routine instance
 */
exports.getTeachersRoutine = function getTeachersRoutine(teachers) {
  return teachers.map(teachersOb => {
    const { name, id } = teachersOb
    const routineMap = teachersOb.routine.getFromStore('routineMap')
    const sortedRoutine = Object.keys(routineMap)
      .map(day => ({ day }))
      // sort by day orderr
      .sort(daysSortFn)
      .map(({ day }) => {
        const routineForDay = routineMap[day]
        const periods = Object.keys(routineForDay)
          .sort((a, b) => a - b)
          .map(period => {
            if (!routineForDay[period]) {
              return undefined
            }
            const { subject } = routineForDay[period]
            return {
              subject,
              className: routineForDay[period].className,
              section: routineForDay[period].section,
            }
          })
        return [day, periods]
      })
    return {
      teacher: name,
      teacherId: id,
      routine: sortedRoutine
    }
  })
}
