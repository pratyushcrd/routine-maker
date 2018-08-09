import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

/**
 * Component to render Classes & School's Chips
 */
function Sections({ classes, section, subjects }) {
  // const classesList = props.classesList
  return (
    <Paper className={classes.root}>
      Section <br />
      {section.section} <br />
      Subjects <br />
      {JSON.stringify(subjects)}
    </Paper>
  )
}

Sections.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  section: PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
  }).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
    subject: PropTypes.string,
  })).isRequired
}

export default Sections
