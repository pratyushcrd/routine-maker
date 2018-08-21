import React from 'react'
import { connect, } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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
  constructor() {
    super()
    this.teacherName = React.createRef()
    this.teacherId = React.createRef()
  }

  state = {
    teacher: '',
    tid: '',
    snackOpen: false,
    snackVariant: '',
    snackMessage: '',
  }

  setInputFocus() {
    // Focus on the ID if value not present & name is provided
    if (this.state.teacher && !this.state.tid) {
      return this.teacherId.current.querySelector('input').focus()
    }
    // Focus on the name otherwise
    this.teacherName.current.querySelector('input').focus()
  }


  addTeacherByEnter = (event) => {
    if (event.key === 'Enter') {
      this.addTeachers()
    }
  }

  handleChange = name => event => {
    let value = event.target.value
    if (name === 'teacher') {
      value = value.replace(/^\s+/, '')
    } else if (name === 'tid') {
      value = value.replace(/\s+/g, '')
    }
    this.setState({
      [name]: value,
    })
  };

  handleClose = () => {
    this.setState({ snackOpen: false })
  }

  addTeachers = () => {
    // set focus to name input element for form input loop
    this.setInputFocus()
    const tid = this.state.tid
    const teacher = this.state.teacher
    if (!tid || !teacher) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Fields cannot be blank',
        snackVariant: 'warning',
      })
      return
    }
    const existingTeacher = this.props.teachers.find(teacherOb => teacherOb.id === tid)
    if (existingTeacher) {
      this.setState({
        snackOpen: true,
        snackMessage: `${existingTeacher.name} has same id '${existingTeacher.id}'`,
        snackVariant: 'warning',
      })
      return
    }
    // Dispatch action to save teacher
    this.props.dispatch({
      type: 'ADD_TEACHER',
      name: this.state.teacher,
      id: this.state.tid,
    })
    // Clear teachers name and id
    this.setState({
      teacher: '',
      tid: '',
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
            <div ref={this.teacherName}>
              <TextField
                id="teacher"
                label="Name"
                className={classes.textField}
                value={this.state.teacher}
                onChange={this.handleChange('teacher')}
                margin="normal"
                onKeyPress={this.addTeacherByEnter}
              />
            </div>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <div ref={this.teacherId}>
              <TextField
                id="tid"
                label="Teacher ID"
                className={classes.textField}
                value={this.state.tid}
                onChange={this.handleChange('tid')}
                margin="normal"
                onKeyPress={this.addTeacherByEnter}
              />
            </div>
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
  teachers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddTeacher))
