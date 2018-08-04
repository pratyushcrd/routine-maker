import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  details: {
    marginTop: `${theme.spacing.unit * 4}px`,
  },
})

function Home(props) {
  return (
    <Grid container spacing={24} >
      <Grid item xs={9}>
        <Grid container>
          <Grid item xs={12} >
            Chips
          </Grid>
          <Grid item xs={12} className={props.classes.details} >
            Details
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} >
        Teachers Panel
      </Grid>
    </Grid>
  )
}

Home.propTypes = {
  classes: PropTypes.shape({
    details: PropTypes.string.isRequired
  }).isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
