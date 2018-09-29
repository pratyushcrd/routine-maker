import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import * as sampleRoutine from './data.json'
import ClassRoutine from './ClassRoutine'

const styles = theme => ({
})

function Routine(props) {
  const { classes } = props
  return (
    <div>
      {
        sampleRoutine.default.map(classRoutine => (
          <ClassRoutine data={classRoutine} />
        ))
      }
      <div style={{ height: '20px' }} />
    </div>
  )
}

Routine.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Routine)
