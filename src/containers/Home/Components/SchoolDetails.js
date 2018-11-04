import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
})

/**
 * Component to render Section SchoolDetails
 */
class SchoolDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return <div />
  }
}

SchoolDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(SchoolDetails)
