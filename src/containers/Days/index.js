import React from 'react'
import { connect, } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ShowDays from './ShowDays'
import AddDay from './AddDay'

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

function Days() {
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <ShowDays />
        </Grid>
        <Grid item xs={4}>
          <AddDay />
        </Grid>
      </Grid>
    </div>
  )
}

Days.propTypes = {
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Days))
