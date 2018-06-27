import React from 'react'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ShowDays from './ShowDays'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
})

function CSSGrid(props) {
  const { classes } = props
  return (
    <div>
      <Typography variant="caption" align="center" gutterBottom>
        Enter Working School Days
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <ShowDays />
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

CSSGrid.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(CSSGrid))
