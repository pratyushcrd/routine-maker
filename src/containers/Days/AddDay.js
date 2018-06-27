import React from 'react'
import { connect, } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
    minWidth: '90%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  textField: {
    minWidth: '90%',
  }
})

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

class ControlledOpenSelect extends React.Component {
  state = {
    day: '',
    periods: 6,
    open: false,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  addDays = () => {
    if (!this.state.day || !this.state.day) {
      return
    }
    this.props.dispatch({
      type: 'ADD_DAY',
      day: this.state.day,
      periods: this.state.periods,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <form autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">Day</InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.day}
              onChange={this.handleChange}
              inputProps={{
                name: 'day',
              }}
            >
              {days.map(day => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>

        <TextField
          id="number"
          label="Number"
          value={this.state.periods}
          onChange={this.handleChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          inputProps={{
            name: 'periods',
          }}
        />

        <br />

        <div>
          <Button
            variant="contained"
            mini
            color="primary"
            aria-label="add"
            onClick={this.addDays}
            className={classes.button}
          >
            Add
          </Button>
        </div>
      </Paper>
    )
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(ControlledOpenSelect))
