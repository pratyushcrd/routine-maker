import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


const styles = theme => ({
})

/**
 * Component to render Section Blank
 */
class Blank extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = this.props.classes

    return <div>
      <Typography>
        School Details
      </Typography>
      <Grid container className={classes.home}>
        <Grid item xs={2}>
        </Grid>
      </Grid>
    </div>
  }
}

Blank.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Blank)
