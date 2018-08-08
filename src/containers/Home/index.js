import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import ChipsList from './ChipsList'
import Sections from './Sections'

const styles = theme => ({
  details: {
    marginTop: `${theme.spacing.unit * 4}px`,
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    const firstClass = this.props.classList[0]
    this.state = {
      selectedClass: firstClass && firstClass.className
    }
  }

  /**
   * Get classes list in format: [{ name: '1' }]
   */
  getClassList = () => {
    const classes = this.props.classList
      .map(({ className }) => ({ className }))
      .sort((a, b) => (a > b ? -1 : 1))
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
      .reduce((acc, val) => {
        acc[val.section] = acc[val.section] || []
        acc[val.section].push(val.subject)
        return acc
      }, {})
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

  selectClass = (obj) => {
    console.log('selectClass', obj)
    this.setState({
      selectedClass: obj.className
    })
  }

  render() {
    const classes = this.props.classes

    const selectClass = this.selectClass

    const sections = this.getSections()
    const subjects = this.getSubjects()

    return (
      <Grid container spacing={24} >
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12} >
              <ChipsList selectClass={selectClass} classesList={this.getClassList()} />
            </Grid>
            <Grid item xs={12} className={classes.details} >
              <Sections
                activeClass={this.state.selectedClass}
                sections={sections}
                subjects={subjects}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} >
          Teachers Panel
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    details: PropTypes.string.isRequired,
  }).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
  })).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
  })).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  })).isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
