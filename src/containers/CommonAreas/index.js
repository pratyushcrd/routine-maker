import React from 'react'
import { connect, } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ShowCommonAreas from './ShowCommonAreas'
import AddCommonArea from './AddCommonArea'

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

function CommonAreas() {
  return (
      <div>
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <ShowCommonAreas />
        </Grid>
        <Grid item xs={4}>
          <AddCommonArea />
        </Grid>
      </Grid>
    </div>
  )
}

CommonAreas.propTypes = {
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(CommonAreas))
