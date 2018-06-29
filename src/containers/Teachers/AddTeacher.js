import React from 'react'
import { connect, } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

MySnackbarContent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)


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
    snackOpen: false,
    snackVariant: '',
    snackMessage: '',
    snackId: -1,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  };

  handleClose = () => {
    this.setState({ snackOpen: false })
  }

  createSnackCloser = (ms = 2000) => {
    const snackId = setTimeout(() => {
      if (this.state.snackId === snackId) {
        this.setState({
          snackOpen: false
        })
      }
    }, ms)
    return snackId
  }


  addTeachers = () => {
    let snackId
    if (!this.state.tid || !this.state.teacher) {
      snackId = this.createSnackCloser()
      this.setState({
        snackOpen: true,
        snackMessage: 'Fields cannot be blank',
        snackVariant: 'warning',
        snackId,
      })
      return
    }
    const { tid } = this.state
    const existingTeacher = this.props.teachers.find(teacher => teacher.id === tid)
    if (existingTeacher) {
      snackId = this.createSnackCloser()
      this.setState({
        snackOpen: true,
        snackMessage: `${existingTeacher.name} has same id '${existingTeacher.id}'`,
        snackVariant: 'warning',
        snackId,
      })
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.snackVariant || 'success'}
            message={this.state.snackMessage || ''}
          />
        </Snackbar>
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
  teachers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddTeacher))
