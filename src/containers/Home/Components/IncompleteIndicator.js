import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'

const styles = theme => ({
  complete: {
    color: theme.palette.primary.light,
    float: 'right',
    // fontSize: 14,
    display: 'none',
  },
  incomplete: {
    color: theme.palette.secondary.light,
    float: 'right',
    // fontSize: 14,
  },
  icon: {
    fontSize: 18,
    marginLeft: theme.spacing.unit * 0.5,
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
        <Tooltip
          disableFocusListener
          title={(
            <Typography variant="caption" style={{ color: 'white' }}>
              {message}
            </Typography>
          )}
        >
          <div
            className={count ? classes.incomplete : classes.complete}
            onMouseEnter={this.popoverOpen}
            onMouseLeave={this.popoverClose}
          >
            <WarningIcon className={classes.icon} />
          </div>
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
