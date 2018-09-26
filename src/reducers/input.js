/* import { } from 'constants/action-types'

const initialState = {
  days: [{
    day: 'Monday',
    periods: 6
  }]
}

export default function input(state = initialState, action) {
  switch (action.type) {
  default:
    return state
  }
} */
import {
  ADD_TEACHER,
  ADD_DAY,
  ADD_CLASS,
  ADD_SECTION,
  ADD_SUBJECT,
  ADD_COMMON_AREA,
  EDIT_DAY,
  EDIT_TEACHER,
  EDIT_SECTION,
  EDIT_SUBJECT,
  DELETE_DAY,
  DELETE_TEACHER,
  DELETE_CLASS,
  DELETE_SECTION,
  DELETE_SUBJECT,
  UPDATE_CLASS_SECTION,
} from 'constants/action-types'
import { createReducer } from './utils'
import { days } from '../constants/index'

const initialState = {
  days: [],
  teachers: [],
  classList: [],
  sections: [],
  subjects: [],
  commonAreas: []
}

function pick(options) {
  return function picker(object) {
    return Object.keys(object)
      .filter(key => options[key])
      .reduce((acc, v) => {
        acc[v] = object[v]
        return acc
      }, {})
  }
}

function uniqueBy(conditionsOb, array) {
  const picker = pick(conditionsOb)
  const map = array.reduce((acc, v) => {
    const key = Object.entries(picker(v)).join('-')
    if (acc[key] === undefined) {
      acc[key] = v
    }
    return acc
  }, {})
  return Object.keys(map)
    .map(key => map[key])
}
const handlers = {
  [ADD_TEACHER]: (state, action) => ({
    teachers: [{
      name: action.name,
      id: action.id,
    }, ...state.teachers]
  }),
  [ADD_DAY]: (state, action) => ({
    days: uniqueBy({ day: 1 }, [{
      day: action.day,
      periods: action.periods
    }, ...state.days].sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day)))
  }),
  [ADD_CLASS]: (state, action) => ({
    classList: [{
      className: action.className
    }, ...state.classList],
    sections: state.sections.concat(action.sections),
    subjects: state.subjects.concat(action.subjects.map(sub =>
      ({
        ...sub,
        id: `@@${sub.className}_${sub.section}_${sub.subject.toLowerCase()}`,
        classLength: sub.classLength || 1,
        commonArea: sub.commonArea || null,
        periodsPerWeek: sub.periodsPerWeek || 0,
        teacherId: sub.teacherId || null,
      })
    ))
  }),
  [ADD_SECTION]: (state, action) => ({
    sections: [{
      className: action.className,
      section: action.section,
      classTeacher: action.classTeacher,
    }, ...state.sections]
  }),
  [ADD_SUBJECT]: (state, action) => ({
    subjects: state.subjects.map((subject) => (subject.id === action.id ? ({
      ...subject,
      id: `@@${subject.className}_${subject.section}_${action.name.toLowerCase()}`,
      classLength: action.classLength || 1,
      commonArea: action.commonArea || null,
      periodsPerWeek: action.periodsPerWeek || 0,
      teacherId: action.teacherId || null,
      subject: action.name
    }) : subject))
  }),
  [ADD_COMMON_AREA]: (state, action) => ({
    commonAreas: [{
      name: action.name,
    }, ...state.commonAreas]
  }),
  [EDIT_DAY]: (state, action) => ({
    days: state.days.map(day => ({
      ...day,
      periods: action.day === day.day ? action.periods : day.periods
    }))
  }),
  [EDIT_TEACHER]: (state, action) => ({
    teachers: state.teachers.map(teacher => ({
      ...teacher,
      name: action.id === teacher.id ? action.name : teacher.name
    }))
  }),
  [EDIT_SECTION]: (state, action) => ({
    sections: state.sections.map(section => ({
      ...section,
      classTeacher: (action.className === section.className) &&
        (action.section === section.section) ? action.classTeacher : section.classTeacher
    }))
  }),
  [EDIT_SUBJECT]: (state, action) => ({
    subjects: state.subjects.map(sub => (sub.id === action.id ?
      {
        className: action.className,
        id: `@@${action.className}_${action.section}_${action.subject.toLowerCase()}`,
        classLength: action.classLength || 1,
        commonArea: action.commonArea || null,
        periodsPerWeek: action.periodsPerWeek || 0
      } : sub))
  }),
  [DELETE_DAY]: (state, action) => ({
    days: state.days.filter(day => action.day !== day.day)
  }),
  [DELETE_TEACHER]: (state, action) => ({
    teachers: state.teachers.filter(teacher => action.id !== teacher.id)
  }),
  [DELETE_CLASS]: (state, action) => ({
    classList: state.classList.filter(c => action.className !== c.className)
  }),
  [DELETE_SECTION]: (state, action) => ({
    sections: state.sections.filter(section => (action.className !== section.className) &&
      (action.section !== section.section))
  }),
  [DELETE_SUBJECT]: (state, action) => ({
    subjects: state.subjects.filter(subjectInfo => (action.className !== subjectInfo.className) &&
      (action.subject !== subjectInfo.subject))
  }),
  [UPDATE_CLASS_SECTION]: (state, action) => {
    const classIndex = state.classList.findIndex(x => x.className === action.className)
    if (classIndex > -1) {
      return {
        classList: [{
          className: action.className,
          section: action.section,
        }, ...state.sections]
      }
    }
    const classList = state.classList.array.slice()
    classList[classIndex] = {
      className: action.className,
      section: action.section,
    }
    return classList
  }
}

const storedState = localStorage.inputState
const inputReducer = createReducer(
  (storedState && JSON.parse(storedState)) || initialState,
  handlers,
)

export default function (state, action) {
  const resState = inputReducer(state, action)
  localStorage.inputState = JSON.stringify(resState)
  return resState
}
