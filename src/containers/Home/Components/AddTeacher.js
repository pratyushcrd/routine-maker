import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

const styles = theme => ({
  formControl: {
    minWidth: '100%',
  },
  textField: {
    marginTop: theme.spacing.unit * 0.5,
    textAlign: 'start',
    minWidth: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    textAlign: 'center',
  },
  formArea: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    minWidth: '100%',
  },
  addTeacherLabel: {
    textAlign: 'flex-start',
    fontSize: '13px',
    color: theme.palette.text.secondary,
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
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
      <Collapse in={this.props.show}>
        <Grid
          container
          alignItems={'center'}
          justify={'flex-start'}

        >
          <Grid item xs={12}>
            <Typography className={classes.addTeacherLabel}>
              Add Teacher
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <form autoComplete="off" className={classes.formArea}>
              <Grid
                container
              >
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <div ref={this.teacherName}>
                      <TextField
                        id="teacher"
                        label="Name"
                        className={classes.textField}
                        margin="normal"
                      />
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={7}>
                  <FormControl className={classes.formControl}>
                    <div ref={this.teacherId}>
                      <TextField
                        id="tid"
                        label="Teacher ID"
                        className={classes.textField}
                        margin="normal"
                      />
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    mini
                    color="primary"
                    aria-label="add"
                    onClick={() => { }}
                    className={classes.button}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Divider />
      </Collapse>
    )
  }
}

AddTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  show: PropTypes.bool.isRequired,
}


export default withStyles(styles)(AddTeacher)
