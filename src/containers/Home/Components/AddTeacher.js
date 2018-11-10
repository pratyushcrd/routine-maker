import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import AddIcon from '@material-ui/icons/Add'
import Snackbar from '@material-ui/core/Snackbar'

import MySnackbarContentWrapper from '../../common/SnackBarContent'

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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 0.5,
    paddingRight: theme.spacing.unit * 0.5,
    // textAlign: 'center',
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
    this.state = {
      teacher: '',
      tid: '',
      snackOpen: false,
      snackVariant: '',
      snackMessage: '',
    }
    window.a = this
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
    this.props.addTeacherFunc(this.state.teacher, this.state.tid)
    // Clear teachers name and id
    this.setState({
      teacher: '',
      tid: '',
    })
    setTimeout(() => {
      // Hack to clear names
      this.teacherId.current.querySelector('input').value = ''
      this.teacherName.current.querySelector('input').value = ''
      // set focus to name input element for form input loop
      this.setInputFocus()
    }, 500)
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
                        onChange={this.handleChange('teacher')}
                        onKeyPress={this.addTeacherByEnter}
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
                        onChange={this.handleChange('tid')}
                        onKeyPress={this.addTeacherByEnter}
                      />
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={2} />
                <Grid item>
                  <IconButton
                    variant="text"
                    color="primary"
                    aria-label="add"
                    onClick={this.addTeachers}
                    className={classes.button}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Divider />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackOpen}
          autoHideDuration={2500}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.snackVariant || 'success'}
            message={this.state.snackMessage || ''}
          />
        </Snackbar>
      </Collapse>
    )
  }
}

AddTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  show: PropTypes.bool.isRequired,
  addTeacherFunc: PropTypes.func.isRequired,
}


export default withStyles(styles)(AddTeacher)
