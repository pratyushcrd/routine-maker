/* eslint-disable */
function putRoutine (days, arr) {
  arr.forEach(data => {
    const routine = new routine(days)
    data.routine = routine
  })
}

function generateRoutine(input) {
  const {
    subjects,
    teachers,
    days,
    sections,
  } = input

  putRoutine(teachers, days)
  putRoutine(sections, days)

  const teachersMap = getTeachersMap(teachers)
  const sectionsMap = getSectionsMap(sections)

  while (subjects.length) {
    const [subject, index] = getSubjectToAssign(subjects, teachersMap, sections)
  }

}

module.exports = generateRoutine
