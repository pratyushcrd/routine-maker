import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  section: {
    marginLeft: '10px',
    fontSize: '20px',
    lineHeight: '20px',
  },
})

/**
 * Component to render SectionCard
 */
function Sections({ classes, section, subjects }) {
  // const classesList = props.classesList
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item>
          <Typography variant="subheading"> Section </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subheading" className={classes.section}> {section.className} - {section.section} </Typography>
        </Grid>
      </Grid>
      <br />
      <Typography variant="subheading"> Subjects </Typography>
      <Typography> {subjects.map(ob => ob.subject + (ob.periodsPerWeek ? ' / ' + ob.periodsPerWeek : '')).join(', ')} </Typography>
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
  })).isRequired,
}

export default withStyles(styles)(Sections)
