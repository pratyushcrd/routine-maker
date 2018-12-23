import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  complete: {
    backgroundColor: 'green',
    height: 4,
    width: 4,
    float: 'right',
    borderRadius: 3,
    marginLeft: 4,
    padding: 2,
  },
  incomplete: {
    backgroundColor: 'red',
    height: 4,
    width: 4,
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
    return `${count} subjects have incomplete details`
  } else if (type === 'section') {
    return `${count} subjects have no teachers assigned`
  } else if (type === 'subject') {
    return 'No teacher is yet assigned to the subject'
  }
}

/**
 * Component to render Section Blank
 */
class IncompleteIndicator extends React.Component {
  state = { open: false }

  /**
   * Toggle popover
   */
  popoverOpen = (event) => {
    console.log('open')
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }
  /**
   * Toggle popover
   */
  popoverClose = () => {
    console.log('close')
    if (!this.state.open) {
      return
    }
    setTimeout(() => {
      this.setState({
        open: false,
      })
    }, 1000)
  }

  render() {
    const classes = this.props.classes
    const count = this.props.count
    const type = this.props.type

    const message = calculateMessage(type, count)

    return (
      <Grid item>
        <div
          className={count ? classes.incomplete : classes.complete}
          onMouseEnter={this.popoverOpen}
          onMouseLeave={this.popoverClose}
        />
        <Popover
          anchorEl={this.state.anchorEl}
          open={this.state.open && message}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography className={classes.popover}>
            {message}
          </Typography>
        </Popover>
      </Grid>
    )
  }
}


IncompleteIndicator.defaultProps = {
  count: 0,
  type: PropTypes.number,
}

IncompleteIndicator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  count: PropTypes.number,
  type: PropTypes.string.isRequired,
}

export default withStyles(styles)(IncompleteIndicator)
