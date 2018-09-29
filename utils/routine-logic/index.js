const {
  putRoutineInstance,
  getSectionFinder,
  getTeacherFinder,
  getSubjectToAssign,
  getPeriodsAssigner,
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
    subjects.sort(() => Math.random() - 0.5)
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

  if (!isAssigned) {
    console.log('Failed to generate routine') // eslint-disable-line no-console
  } else {
    console.log('Success! routine generated') // eslint-disable-line no-console
  }
}

module.exports = generateRoutine


generateRoutine({ days: [{ day: 'Monday', periods: 8 }, { day: 'Tuesday', periods: 8 }, { day: 'Wednesday', periods: 8 }, { day: 'Thursday', periods: 8 }, { day: 'Friday', periods: 8 }], teachers: [{ name: 'Suresh Deshpandey Choudhary', id: 'sd121' }, { name: 'Zakira', id: 'zk21' }, { name: 'Hima Das', id: 'hm23' }, { name: 'Mahesh Kumar', id: 'mh23' }, { name: 'Mahavir Singh', id: 'ms12' }, { name: 'Manish', id: 'mn98' }, { name: 'Rama Das', id: 'rd67' }, { name: 'Jagdish Kumar', id: 'kh23' }], classList: [{ className: '1' }], sections: [{ className: '1', section: 'A' }, { className: '1', section: 'B' }], subjects: [{ className: '1', section: 'A', subject: 'English', periodsPerWeek: 6, id: '@@1_A_english', classLength: 1, commonArea: null, teacherId: 'sd121' }, { className: '1', section: 'A', subject: 'Hindi', periodsPerWeek: 6, id: '@@1_A_hindi', classLength: 1, commonArea: null, teacherId: 'hm23' }, { className: '1', section: 'A', subject: 'Maths', periodsPerWeek: 8, id: '@@1_A_maths', classLength: 1, commonArea: null, teacherId: 'mh23' }, { className: '1', section: 'A', subject: 'Science', periodsPerWeek: 10, id: '@@1_A_science', classLength: 1, commonArea: null, teacherId: 'zk21' }, { className: '1', section: 'A', subject: 'Geography', periodsPerWeek: 10, id: '@@1_A_geography', classLength: 1, commonArea: null, teacherId: 'mh23' }, { className: '1', section: 'B', subject: 'English', periodsPerWeek: 8, id: '@@1_B_english', classLength: 1, commonArea: null, teacherId: 'sd121' }, { className: '1', section: 'B', subject: 'Hindi', periodsPerWeek: 8, id: '@@1_B_hindi', classLength: 1, commonArea: null, teacherId: 'hm23' }, { className: '1', section: 'B', subject: 'Maths', periodsPerWeek: 8, id: '@@1_B_maths', classLength: 1, commonArea: null, teacherId: 'mh23' }, { className: '1', section: 'B', subject: 'Science', periodsPerWeek: 8, id: '@@1_B_science', classLength: 1, commonArea: null, teacherId: 'hm23' }, { className: '1', section: 'B', subject: 'Geography', periodsPerWeek: 8, id: '@@1_B_geography', classLength: 1, commonArea: null, teacherId: 'zk21' }], commonAreas: [{ name: "Senior's Library" }, { name: "Junior's Library" }] })
