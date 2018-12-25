import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
})

function Routine(props) {
  const { data, ViewComponent } = props
  return (
    <div>
      {
        data.map(classRoutine => (
          <ViewComponent data={classRoutine} />
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
