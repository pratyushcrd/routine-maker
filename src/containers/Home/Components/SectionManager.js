import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'

import SectionDetails from './SectionDetails'
import Subject from './Subject'
import EditSubject from './EditSubject'

function getSubjectsBySection(subjects) {
  return subjects
    .reduce((acc, subject) => {
      acc[subject.section] = acc[subject.section] || []
      acc[subject.section].push(subject)
      return acc
    }, {})
}

function joinClasses(...params) {
  return params.join(' ')
}

function getTotalPeriods(subjects) {
  return subjects
    .map(subject => +subject.periodsPerWeek || 0)
    .reduce((a, b) => a + b, 0)
}

const styles = theme => ({
  sectionHeader: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  header: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  sectionsButton: {
    marginRight: theme.spacing.unit,
    background: '#fff',
    color: theme.palette.text.secondary,
    textTransform: 'none',
  },
  sectionsButtonSelected: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  subjectGrid: {
    // padding: '6px 6px !important',
  },
  classDetailsGrid: {
    marginTop: theme.spacing.unit * 2,
  },
  subjectTitleGrid: {
    paddingBottom: '0',
    marginBottom: -theme.spacing.unit * 2,
  },
  animContainer: {
    padding: '1px'
  }
})

/**
 * Component to Manage all Sections of a Class
 */
class Sections extends React.Component {
  constructor(props) {
    super(props)
    const sections = this.props.sections
    this.state = {
      activeSection: sections[0].section,
      editSubject: -1,
    }
  }

  /**
   * Set active section to first when class is changed
   */
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      editSubject: -1
    })
  }

  /**
   * Function to check if given section isActive
   */
  isActive = (sectionName) => this.state.activeSection === sectionName

  /**
   * Function that returns a function to mark a section active
   */
  markActive = (activeSection) => () => this.setState({ activeSection })

  /**
   * Function to mark which class is to be edited
   */
  toggleEditSubject = (subject) => () => {
    this.setState(state => ({
      editSubject: state.editSubject === subject ? -1 : subject
    }))
  }

  render() {
    const classes = this.props.classes
    const sections = this.props.sections
    const subjects = this.props.subjects
    const activeClass = this.props.activeClass
    const sectionBtnClass = classes.sectionsButton
    const sectionBtnClassActive = joinClasses(
      classes.sectionsButton, classes.sectionsButtonSelected
    )
    const activeSection = this.state.activeSection
    const subjectMap = getSubjectsBySection(subjects)
    const totalPeriods = this.props.totalPeriods
    const activeSectionSubjects = subjectMap[activeSection]
    const activeSectionPeriodsPerWeek = getTotalPeriods(activeSectionSubjects)

    const teachersMap = this.props.teachersMap
    const commonAreas = this.props.commonAreas

    return (
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" className={classes.sectionHeader}>
              Sections
          </Typography>
          {sections.map(section => (
            <Button
              key={`class@@section@card@@${activeClass + section.section}`}
              variant={this.isActive(section.section) ? 'raised' : 'contained'}
              onClick={this.markActive(section.section)}
              className={this.isActive(section.section) ? sectionBtnClassActive : sectionBtnClass}
            >
              Section {section.section}
            </Button>
          ))}
        </Grid>
        <Grid item xs={6} className={classes.classDetailsGrid} >
          <Typography variant="subheading" className={classes.header}>
            Details
          </Typography>
          <SectionDetails
            activeClass={activeClass}
            activeSection={activeSection}
            subjects={activeSectionSubjects}
            periodsAssigned={activeSectionPeriodsPerWeek}
            totalPeriods={totalPeriods}
          />
        </Grid>

        <Grid item xs={12} className={classes.subjectTitleGrid}>
          <Typography variant="subheading" className={classes.header}>
            Subjects
          </Typography>
        </Grid>

        {
          activeSectionSubjects.map(subject => (
            <Grid
              key={['subject@@', subject.subject].join('-')}
              item
              xs={6}
              className={classes.subjectGrid}
            >

              <Collapse
                in={this.state.editSubject !== subject.subject}
                className={classes.animContainer}
              >
                <Subject
                  subject={subject}
                  teachersMap={teachersMap}
                  toggleEdit={this.toggleEditSubject(subject.subject)}
                />
              </Collapse>
              <Collapse
                in={this.state.editSubject === subject.subject}
                className={classes.animContainer}
              >
                <EditSubject
                  subject={subject}
                  teachersMap={teachersMap}
                  toggleEdit={this.toggleEditSubject(subject.subject)}
                  periodsAssigned={activeSectionPeriodsPerWeek}
                  totalPeriods={totalPeriods}
                  commonAreas={commonAreas}
                  updateSubject={this.props.updateSubject}
                />
              </Collapse>

            </Grid>
          ))
        }

      </Grid>
    )
  }
}

Sections.defaultProps = {
  activeClass: '',
}

Sections.propTypes = {
  activeClass: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
  })).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
    subject: PropTypes.string,
  })).isRequired,
  classes: PropTypes.shape({
  }).isRequired,
  totalPeriods: PropTypes.number.isRequired,
  teachersMap: PropTypes.shape({}).isRequired,
  commonAreas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  updateSubject: PropTypes.func.isRequired,
}

export default withStyles(styles)(Sections)
