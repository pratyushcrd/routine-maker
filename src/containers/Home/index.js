import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'

function Home() {
  return (
    <Grid container spacing={24} >
      <Grid item xs={9}>
        <Grid container>
          <Grid item xs={12}>
            Chips
          </Grid>
          <Grid item xs={12}>
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

Home.propTypes = {}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(Home)
