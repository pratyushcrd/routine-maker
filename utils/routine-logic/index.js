const {
  putRoutineInstance,
  getSectionFinder,
  getTeacherFinder,
  getCommonAreaFinder,
  getSubjectToAssign,
  getPeriodsAssigner,
  getSectionsRoutine,
  getTeachersRoutine,
  getCommonAreasRoutine,
} = require('./helpers')

function generateRoutine(input) {
  const {
    subjects,
    teachers,
    days,
    sections,
    commonAreas,
  } = input

  let isAssigned = true

  putRoutineInstance(sections, days)
  putRoutineInstance(teachers, days)
  putRoutineInstance(commonAreas, days)

  const sectionFinder = getSectionFinder(sections)
  const teacherFinder = getTeacherFinder(teachers)
  const commonAreaFinder = getCommonAreaFinder(commonAreas)

  const assignPeriodToSubject = getPeriodsAssigner(
    sectionFinder, teacherFinder, commonAreaFinder, days
  )

  while (subjects.length) {
    // sort subjects randomly
    // subjects.sort(() => Math.random() - 0.5)
    // get subjct to be assigned
    const [index, subject] = getSubjectToAssign(sectionFinder, teacherFinder, commonAreaFinder, subjects)
    // remove subject to be assigned from subjects list
    subject.periodsPerWeek -= 1
    if (!subject.periodsPerWeek) {
      subjects.splice(index, 1)
    }
    // assign available class to subject
    const wasCurrentlyAssigned = assignPeriodToSubject(subject)
    // decrement counter
    isAssigned = isAssigned && wasCurrentlyAssigned
  }

  const sectionsRoutine = getSectionsRoutine(sections, teacherFinder)
  const teachersRoutine = getTeachersRoutine(teachers)
  const commonAreasRoutine = getCommonAreasRoutine(commonAreas)

  if (!isAssigned) {
    console.log('Failed to generate routine') // eslint-disable-line no-console
  } else {
    console.log('Success! routine generated') // eslint-disable-line no-console
  }

  return {
    sectionsRoutine,
    teachersRoutine,
    commonAreasRoutine,
  }
}

module.exports = generateRoutine
