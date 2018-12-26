import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  complete: {
    // backgroundColor: theme.palette.primary.light,
    height: 6,
    width: 6,
    float: 'right',
    borderRadius: 3,
    marginLeft: 4,
    padding: 2,
  },
  incomplete: {
    backgroundColor: theme.palette.secondary.light,
    height: 6,
    width: 6,
    float: 'right',
    borderRadius: 3,
    marginLeft: 4,
    padding: 2,
  },
  popover: {
    padding: 4,
  },
})


/**
 * Function to generate error message for different entities
 * @param {String} type type of ellement where indicator is used
 * @param {*} count count of incomplete entries
 */
function calculateMessage(type, count) {
  if (!count) {
    return ''
  }
  if (type === 'class') {
    return 'Few subjects have incomplete details'
  } else if (type === 'section') {
    return 'Few subjects have no teachers assigned'
  } else if (type === 'subject') {
    return 'No teacher is yet assigned to the subject'
  }
}

/**
 * Component to render Section Blank
 */
class IncompleteIndicator extends React.Component {
  state = { open: false }

  render() {
    const classes = this.props.classes
    const count = this.props.count
    const type = this.props.type

    const message = calculateMessage(type, count)

    return (
      <Grid item>
        <Tooltip disableFocusListener title={message}>
          <div
            className={count ? classes.incomplete : classes.complete}
            onMouseEnter={this.popoverOpen}
            onMouseLeave={this.popoverClose}
          />
        </Tooltip>
      </Grid>
    )
  }
}


IncompleteIndicator.defaultProps = {
  count: 0,
}

IncompleteIndicator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  count: PropTypes.number,
  type: PropTypes.string.isRequired,
}

export default withStyles(styles)(IncompleteIndicator)
