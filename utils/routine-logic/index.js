const {
  putRoutineInstance,
  getSectionFinder,
  getTeacherFinder,
  getSubjectToAssign,
  getPeriodsAssigner,
  getSectionsRoutine,
  getTeachersRoutine,
} = require('./helpers')

function generateRoutine(input) {
  const {
    subjects,
    teachers,
    days,
    sections,
  } = input

  let isAssigned = true

  putRoutineInstance(sections, days)
  putRoutineInstance(teachers, days)

  const sectionFinder = getSectionFinder(sections)
  const teacherFinder = getTeacherFinder(teachers)

  const assignPeriodToSubject = getPeriodsAssigner(sectionFinder, teacherFinder, days)

  while (subjects.length) {
    // sort subjects randomly
    // subjects.sort(() => Math.random() - 0.5)
    // get subjct to be assigned
    const [index, subject] = getSubjectToAssign(sectionFinder, teacherFinder, subjects)
    // remove subject to be assigned from subjects list
    subject.periodsPerWeek -= 1
    if (!subject.periodsPerWeek) {
      subjects.splice(index, 1)
    }
    // assign available class to subject
    const wasAssignedNow = assignPeriodToSubject(subject)
    // decrement counter
    isAssigned = isAssigned && wasAssignedNow
  }

  const sectionsRoutine = getSectionsRoutine(sections, teacherFinder)
  const teachersRoutine = getTeachersRoutine(teachers)

  if (!isAssigned) {
    console.log('Failed to generate routine') // eslint-disable-line no-console
  } else {
    console.log('Success! routine generated') // eslint-disable-line no-console
  }

  return {
    sectionsRoutine,
    teachersRoutine,
  }
}

module.exports = generateRoutine
