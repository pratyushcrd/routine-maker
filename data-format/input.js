module.exports = {
  days: [
    {
      day: 'monday',
      periods: 8,
    }, {
      day: 'tuesday',
      periods: 8,
    }, {
      day: 'wednesday',
      periods: 8,
    }, {
      day: 'thursday',
      periods: 8,
    }, {
      day: 'friday',
      periods: 8,
    },
  ],
  commonAreas: [
    {
      name: 'Library',
    },
    {
      name: "Junior's Ground",
    },
    {
      name: "Senior's Ground",
    },
  ],
  teacher: [
    {
      id: 'ID234',
      name: 'Kiran Rao',
    }
  ],
  classes: [{
    className: '1',
    section: 'A',
    classTeacher: '234',
  }, {
    className: '1',
    section: 'B',
    classTeacher: '',
  }, {
    className: '1',
    section: 'C',
    classTeacher: '',
  }],
  subjects: [
    {
      className: '1',
      section: 'A',
      subject: 'English',
      periodsPerWeek: 6,
      teachers: ['ID234']
    }, {
      className: '1',
      section: 'A',
      subject: 'Hindi',
      periodsPerWeek: 6,
      teachers: ['ID276'],
    }, {
      className: '1',
      section: 'A',
      subject: 'Maths',
      periodsPerWeek: 6,
      teachers: [],
      classLength: 2,
    }, {
      className: '1',
      section: 'A',
      subject: 'Science',
      periodsPerWeek: 6,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'History',
      periodsPerWeek: 3,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'Civics',
      periodsPerWeek: 3,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'Geography',
      periodsPerWeek: 3,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'PT',
      periodsPerWeek: 2,
      teachers: [],
      dependence: "Senior's Ground",
      classLength: 2,
    }, {
      className: '1',
      section: 'A',
      subject: 'Library',
      periodsPerWeek: 1,
      teachers: [],
      dependence: 'Library'
    }, {
      className: '1',
      section: 'A',
      subject: 'Environment',
      periodsPerWeek: 1,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'Arts',
      periodsPerWeek: 1,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'Music',
      periodsPerWeek: 1,
      teachers: [],
    }, {
      className: '1',
      section: 'A',
      subject: 'Sanskrit',
      periodsPerWeek: 1,
      teachers: [],
    }
  ],
  globals: {
    teacherMaxClassPerDay: {
      8: 6
    },
    classTeacherFirstClass: true
  },
}
