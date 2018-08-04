import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
    marginTop: 0,
  },
  chipsContainer: {
    margin: theme.spacing.unit,
    marginTop: 0,
  }
})

class Chips extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getList() {
    const classes = this.props.classList
      .map(({ className }) => className)
    return classes
  }

  handleClick = (index) => {
    const handler = this.props.changeScreen
    return function () {
      handler(index)
    }
  }

  render() {
    const names = this.getList()
    const classes = this.props.classes
    console.log(this.state, 'state')

    return (
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" gutterBottom>
            Select a school or class:
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.chipsContainer} >
          {names.map((name, index) => (
            <Chip
              key={`@@homechips#${name}`}
              label={`Class ${name}`}
              onClick={this.handleClick(index)}
              className={classes.chip}
            />
          ))}
        </Grid>
      </Grid>
    )
  }
}

Chips.propTypes = {
  classList: PropTypes.arrayOf(
    PropTypes.shape({ className: PropTypes.string.isRequired })
  ).isRequired,
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired
  }).isRequired,
  changeScreen: PropTypes.func.isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Chips))
