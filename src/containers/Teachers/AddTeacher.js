import React from 'react'
import { connect, } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
    minWidth: '90%',
    marginLeft: '3%'
  },
  formControl: {
    marginTop: theme.spacing.unit,
    minWidth: '90%',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'start',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  textField: {
    minWidth: '90%',
    textAlign: 'start',
    marginLeft: '3%'
  }
})

class AddTeacher extends React.Component {
  state = {
    teacher: '',
    tid: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  addTeachers = () => {
    if (!this.state.tid || !this.state.teacher) {
      return
    }
    this.props.dispatch({
      type: 'ADD_TEACHER',
      name: this.state.teacher,
      id: this.state.tid,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Typography variant="caption" align="left" gutterBottom className={classes.textField}>
          Add teachers
        </Typography>
        <form autoComplete="off">
          <FormControl className={classes.formControl}>
            <TextField
              id="teacher"
              label="Name"
              className={classes.textField}
              value={this.state.teacher}
              onChange={this.handleChange('teacher')}
              margin="normal"
            />
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <TextField
              id="tid"
              label="Teacher ID"
              className={classes.textField}
              value={this.state.tid}
              onChange={this.handleChange('tid')}
              margin="normal"
            />
          </FormControl>
        </form>

        <div>
          <Button
            variant="contained"
            mini
            color="primary"
            aria-label="add"
            onClick={this.addTeachers}
            className={classes.button}
          >
            Add
          </Button>
        </div>
      </Paper>
    )
  }
}

AddTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddTeacher))
