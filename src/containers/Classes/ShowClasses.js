import React from 'react'
// import PropTypes from 'prop-types'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
})

const getSingleClass = (classes) => ({ className, subjects, sections }) => (
  <Grid item xs={6} key={`classList@@${className}`} >
    <Paper className={classes.paper} >
      <Grid container alignItems={'center'} spacing={16} >
        <Grid item xs={3} align={'center'} >
          <Typography variant="caption" gutterBottom align="center">
            Class Name
          </Typography>
          <Typography variant="display2" gutterBottom align="center">
            {className}
          </Typography>
        </Grid>
        <Grid item xs={1} align={'center'} >
          {''}
        </Grid>
        <Grid item xs={8} align={'start'} >
          <Typography variant="caption" gutterBottom align="left">
            Sections
          </Typography>
          <Grid container spacing={8}>
            { sections.map(({ name }) => (
              <Grid item key={`${className}@@${name}`} >
                <Chip label={name} className={classes.chip} />
              </Grid>
            )) }
          </Grid>
          <br />
          <Typography variant="caption" gutterBottom align="left">
            Subjects
          </Typography>
          <Grid container spacing={8}>
            { subjects.map(({ name }) => (
              <Grid item key={`${className}@@${name}`} >
                <Chip label={name} className={classes.chip} />
              </Grid>
            )) }
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
)

function ShowClasses(props) {
  const { classes, classList = {} } = props
  return (
    <Grid container spacing={24}>
      {
        classList.map(getSingleClass(classes))
      }
    </Grid>
  )
}

ShowClasses.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
    subjects1: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    }))
  })).isRequired,
}

function mapStateToProperties(state) {
  return state.input
}

export default connect(mapStateToProperties)(withStyles(styles)(ShowClasses))
