const {
  putRoutineInstance,
  getSectionFinder,
  getTeacherFinder,
  getSubjectToAssign,
  assignPeriodToSubject,
} = require('./helpers')

function generateRoutine(input) {
  const {
    subjects,
    teachers,
    days,
    sections,
  } = input

  putRoutineInstance(sections, days)
  putRoutineInstance(teachers, days)

  const sectionFinder = getSectionFinder(sections)
  const teacherFinder = getTeacherFinder(teachers)

  let subI = subjects.length

  while (subI) {
    const [subject, index] = getSubjectToAssign(sectionFinder, teacherFinder, subjects)
    // remove subject to be assigned from subjects list
    subjects.splice(index, 1)
    // assign available class to subject
    assignPeriodToSubject(subject, sectionFinder, teacherFinder)
    // decrement counter
    subI -= 1
  }

  if (subjects.length) {
    console.log('Failed to generate routine') // eslint-disable-line no-console
  } else {
    console.log('Success! routine generated') // eslint-disable-line no-console
  }

}

module.exports = generateRoutine
