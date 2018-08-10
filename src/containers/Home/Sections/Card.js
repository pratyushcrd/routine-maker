import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

/**
 * Component to render SectionCard
 */
function Sections({ classes, section, subjects }) {
  // const classesList = props.classesList
  return (
    <Paper className={classes.root}>
      <Typography variant="subheading"> Section </Typography>
      <Typography> {section.section} </Typography>
      <Typography variant="subheading"> Subjects </Typography>
      <Typography> {subjects.map(ob => ob.subject).join(', ')} </Typography>
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
