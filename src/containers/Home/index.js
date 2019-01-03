import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import SectionManager from './Components/SectionManager'
import AddClassDialog from './Dialogs/AddClassDialog'
import ClassSidebar from './Components/ClassSidebar'
import TeacherArea from './Components/TeacherArea'
import SchoolDetails from './Components/SchoolDetails'
import { ADD_SUBJECT, ADD_COMMON_AREA } from '../../constants/action-types'

function getTeachersMap(arr) {
  return arr.reduce((acc, teacher) => {
    acc[teacher.id] = teacher
    return acc
  }, {})
}

const getKey = (...params) => params.join('__')

function getIncompleteMap(subjects) {
  const incompleteSubjects = subjects.filter(sub => !sub.teacherId)
  const sectionsIncomplete = {}
  const subjectsIncomplete = {}
  const classesIncomplete = {}
  const total = incompleteSubjects.length

  incompleteSubjects.forEach(sub => {
    const { className, section, subject } = sub
    const sectionKey = getKey(className, section)
    const subjectKey = getKey(className, section, subject)

    classesIncomplete[className] = (classesIncomplete[className] || 0) + 1
    sectionsIncomplete[sectionKey] = (sectionsIncomplete[sectionKey] || 0) + 1
    subjectsIncomplete[subjectKey] = 1
  })

  return {
    total: () => total,
    byClass: className => classesIncomplete[className] || 0,
    bySection: section => sectionsIncomplete[getKey(section.className, section.section)] || 0,
    bySubject: ({ className, section, subject }) =>
      subjectsIncomplete[getKey(className, section, subject)] || 0
  }
}

const styles = theme => ({
  home: {
    height: 'calc(91vh)',
    maxHeight: 'calc(91vh)',
    overflow: 'hidden',
    padding: '0 !important',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  sectionManagerContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '1px',
    '&::-webkit-scrollbar': {
    },
  },
  teacherAreaContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '1px',
    '&::-webkit-scrollbar': {
    },
  },
  classSideBarContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '1px',
    '&::-webkit-scrollbar': {
    },
  },
  sectionManager: {
    paddingTop: `${theme.spacing.unit * 2}px`,
    paddingLeft: '1%',
  },
  backPaperLeft: {
    minHeight: '100%',
    padding: theme.spacing.unit * 0,
    paddingTop: theme.spacing.unit * 1.5,
    boxShadow: 'none',
    borderRight: 'groove rgba(0, 0, 0, 0.12)',
  },
  backPaperRight: {
    minHeight: '100%',
    padding: theme.spacing.unit * 0,
    paddingTop: theme.spacing.unit * 1.5,
    boxShadow: 'none',
    borderLeft: 'groove rgba(0, 0, 0, 0.12)'
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedClass: 'school',
      addClassDialogOpen: false,
      addSectionDialogOpen: false,
      displayAddTeacher: false
    }
  }

  /**
   * Get classes list in format: [{ name: '1' }]
   */
  getClassList = () => {
    const classes = this.props.classList
      .sort((a, b) => (a.className > b.className ? 1 : -1))
    return classes
  }


  /**
   * Get subjects list in format: [{ className: '1', section: 'A', subject: 'English' }]
   */
  getSubjects = () => {
    // Get sections for selected class only
    const selectedClass = this.state.selectedClass

    const subjects = this.props.subjects
      .filter(ob => (
        ob.className === selectedClass
      ))
    return subjects
  }

  /**
   * Get sections list in format: [{ className: '1', section: 'A' }]
   */
  getSections = () => {
    // Get sections for selected class only
    const selectedClass = this.state.selectedClass

    const sections = this.props.sections
      .filter(ob => ob.className === selectedClass)
    return sections
  }

  /**
   * Get common areas list in format: [{ name: 'Ground' }]
   */
  getCommonAreas = () => this.props.commonAreas.slice()

  /**
   * Get teachers in format {name: "Name", id: "Id", periods: 10}
   */
  getTeachers = () => {
    // Store teachers in map hashed by ip
    const teachersMap = getTeachersMap(
      this.props.teachers
        .slice()
        .map(teacher => ({
          ...{
            periodsAssigned: 0,
            subjects: []
          },
          ...teacher
        }))
    )

    // Iterate over subjects that are relevant
    this.props.subjects
      .filter(sub => +sub.periodsPerWeek && sub.teacherId)
      .forEach(sub => {
        const teacher = teachersMap[sub.teacherId]
        // Return if teacher not found
        if (!teacher) {
          console.error('Teacher not valid for', sub) // eslint-disable-line
          return
        }
        // increment periods assigned to teacher by subject's periods count
        teacher.periodsAssigned += (+sub.periodsPerWeek || 0)
        // Push current subject to teachers entry
        teacher.subjects.push(sub)
      })
    return Object.entries(teachersMap)
      .map(arr => arr[1])
  }

  /**
   * Get total periods in school
   */
  getTotalPeriods = () => this.props.days
    .map(ob => ob.periods)
    .reduce((a, b) => a + b, 0)

  /**
   * Toggle add teacher field in right
   */
  toogleDisplayAddTeacher = () => {
    this.setState(state => ({ displayAddTeacher: !state.displayAddTeacher }))
  }

  /**
   * Function to set a class active
   */
  selectClass = (obj) => {
    this.setState({
      selectedClass: obj.className
    })
  }

  /**
   * Set AddClassDialog opened or closed
   */
  handleClassDialog = (val) => () => {
    this.setState({
      addClassDialogOpen: val
    })
  }

  updateSubject = (id, name, teacherId, periodsPerWeek, commonArea, classLength) => {
    this.props.dispatch({
      type: ADD_SUBJECT, id, name, teacherId, periodsPerWeek, commonArea, classLength
    })
  }

  addCommonArea = (name) => {
    this.props.dispatch({
      type: ADD_COMMON_AREA,
      name,
    })
  }

  /**
   * Function to update day's number of periods
   */
  updateDays = (day, periods) => {
    this.props.dispatch({
      type: 'ADD_DAY',
      day,
      periods,
    })
  }

  /**
   * Dispatch action to add class
   */
  addClass = ({
    className, sections = [], subjects = []
  }) => this.props.dispatch({
    type: 'ADD_CLASS',
    className,
    sections,
    subjects
  })

  addTeacher = (teacherName, teacherId) => {
    // Dispatch action to save teacher
    this.props.dispatch({
      type: 'ADD_TEACHER',
      name: teacherName,
      id: teacherId,
    })
  }

  deleteSubject = (subjectId) => {
    this.props.dispatch({
      type: 'DELETE_SUBJECT',
      subjectId,
    })
  }

  deleteCommonArea = (commonAreaName) => {
    this.props.dispatch({
      type: 'DELETE_COMMON_AREA',
      commonAreaName,
    })
  }

  render() {
    console.log(this.props)
    const classes = this.props.classes

    const selectClass = this.selectClass
    const selectSchool = () => this.setState({
      selectedClass: 'school'
    })

    const sections = this.getSections()
    const subjects = this.getSubjects()
    const teachers = this.getTeachers()

    const commonAreas = this.getCommonAreas()
    const teachersMap = getTeachersMap(teachers)
    const totalPeriods = this.getTotalPeriods()
    const showClass = this.state.selectedClass !== 'school' &&
      this.props.classList.length

    const incompleteMap = getIncompleteMap(this.props.subjects)

    return (
      <Grid container className={classes.home}>
        <AddClassDialog
          open={this.state.addClassDialogOpen}
          onClose={this.handleClassDialog(false)}
          addClass={this.addClass}
          classList={this.getClassList()}
          sections={sections}
          totalPeriods={totalPeriods}
        />
        <Grid item xs={2} className={classes.classSideBarContainer}>
          <Paper className={classes.backPaperLeft}>
            <ClassSidebar
              activeClass={this.state.selectedClass}
              selectClass={selectClass}
              selectSchool={selectSchool}
              classesList={this.getClassList()}
              addClass={this.handleClassDialog(true)}
              totalPeriods={totalPeriods}
              incompleteMap={incompleteMap}
            />
          </Paper>
        </Grid>
        <Grid item xs={8} className={classes.sectionManagerContainer} >
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10} className={classes.sectionManager} >
              { showClass ? <SectionManager
                activeClass={this.state.selectedClass}
                sections={sections}
                subjects={subjects}
                teachersMap={teachersMap}
                totalPeriods={totalPeriods}
                commonAreas={commonAreas}
                updateSubject={this.updateSubject}
                addSection={this.handleClassDialog(this.state.selectedClass)}
                incompleteMap={incompleteMap}
                deleteSubject={this.deleteSubject}
              /> : <SchoolDetails
                updateDays={this.updateDays}
                addCommonArea={this.addCommonArea}
                deleteCommonArea={this.deleteCommonArea}
                commonAreas={commonAreas}
                days={this.props.days}
              /> }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.teacherAreaContainer}>
          <Paper className={classes.backPaperRight}>
            <TeacherArea
              teachers={teachers}
              teachersMap={teachersMap}
              toogleDisplayAddTeacher={this.toogleDisplayAddTeacher}
              displayAddTeacher={this.state.displayAddTeacher}
              addTeacherFunc={this.addTeacher}
              totalPeriods={totalPeriods}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    sectionManager: PropTypes.string,
  }).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
  })).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
  })).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
    subject: PropTypes.string,
    periodsPerWeek: PropTypes.number,
  })).isRequired,
  days: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string,
    periods: PropTypes.number,
  })).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  commonAreas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
