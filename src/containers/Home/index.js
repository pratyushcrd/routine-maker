import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SectionManager from './Components/SectionManager'
import AddClassDialog from './Dialogs/AddClassDialog'
import ClassSidebar from './Components/ClassSidebar'
import TeacherArea from './Components/TeacherArea'

function getTeachersMap (arr) {
  return arr.reduce((acc, teacher) => {
    acc[teacher.id] = teacher
    return acc
  }, {})
}

const styles = theme => ({
  home: {
    height: 'calc(100vh - 38px)',
    maxHeight: 'calc(100vh - 38px)',
    overflow: 'hidden',
  },
  sectionManager: {
    marginTop: `${theme.spacing.unit * 2}px`,
    marginLeft: '-3%',
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    const firstClass = this.getClassList()[0]
    this.state = {
      selectedClass: firstClass && firstClass.className,
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

  toogleDisplayAddTeacher = () =>{
    this.setState(state => ({ displayAddTeacher: !state.displayAddTeacher }))
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
      addClassDialogOpen: !!val
    })
  }

  /**
   * Dispatch action to add class
   */
  addClass = ({
    className, sections = [], subjects = [], classSections = [], classSubjects = []
  }) => this.props.dispatch({
    type: 'ADD_CLASS',
    className,
    sections,
    subjects,
    classSections,
    classSubjects,
  })

  render() {
    const classes = this.props.classes

    const selectClass = this.selectClass

    const sections = this.getSections()
    const subjects = this.getSubjects()
    const teachers = this.getTeachers()
    const teachersMap = getTeachersMap(teachers)
    const totalPeriods = this.getTotalPeriods()

    return (
      <Grid container className={classes.home}>
        <AddClassDialog
          open={this.state.addClassDialogOpen}
          onClose={this.handleClassDialog(false)}
          addClass={this.addClass}
          classList={this.getClassList()}
        />
        <Grid item xs={2} >
          <ClassSidebar
            activeClass={this.state.selectedClass}
            selectClass={selectClass}
            classesList={this.getClassList()}
            addClass={this.handleClassDialog(true)}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12} className={classes.sectionManager} >
              <SectionManager
                activeClass={this.state.selectedClass}
                sections={sections}
                subjects={subjects}
                teachersMap={teachersMap}
                totalPeriods={totalPeriods}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} >
          <TeacherArea
            teachers={teachers}
            teachersMap={teachersMap}
            toogleDisplayAddTeacher = {this.toogleDisplayAddTeacher}
            displayAddTeacher = {this.state.displayAddTeacher}
          />
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
  dispatch: PropTypes.func.isRequired,
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
