import React from 'react'
import { connect, } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ShowClasses from './ShowClasses'
import AddClass from './AddClass'

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

function Classes() {
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <ShowClasses />
        </Grid>
        <Grid item xs={4}>
          <AddClass />
        </Grid>
      </Grid>
    </div>
  )
}

Classes.propTypes = {
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Classes))
