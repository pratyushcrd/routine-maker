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
import MySnackbarContentWrapper from '../common/SnackBarContent'

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

class AddCommonArea extends React.Component {
  constructor() {
    super()
    this.commonAreaName = React.createRef()
    this.commonAreaCount = React.createRef()
  }

  state = {
    name: '',
    count: '',
    snackOpen: false,
    snackVariant: '',
    snackMessage: '',
  }

  setInputFocus() {
    // Focus on the count if value not present & name is provided
    if (this.state.name && !this.state.count) {
      return this.commonAreaCount.current.querySelector('input').focus()
    }
    // Focus on the name otherwise
    this.commonAreaName.current.querySelector('input').focus()
  }


  addCommonAreaByEnter = (event) => {
    if (event.key === 'Enter') {
      this.addTeachers()
    }
  }

  handleChange = name => event => {
    let value = event.target.value
    if (name === 'name') {
      value = value.replace(/^\s+/, '')
    } else if (name === 'count') {
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
    const count = this.state.count
    const name = this.state.name
    if (!count || !name) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Fields cannot be blank',
        snackVariant: 'warning',
      })
      return
    }
    // Dispatch action to save common area
    this.props.dispatch({
      type: 'ADD_Common_Area',
      name: this.state.name,
      count: this.state.count,
    })
    // Clear common area name and count
    this.setState({
      name: '',
      count: '',
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
          autoHideDuration={2500}
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
            <div ref={this.teacherName}>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.teacher}
                onChange={this.handleChange('name')}
                margin="normal"
                onKeyPress={this.addCommonAreaByEnter}
              />
            </div>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <div ref={this.teacherId}>
              <TextField
                id="count"
                label="Count"
                className={classes.textField}
                value={this.state.tid}
                onChange={this.handleChange('count')}
                margin="normal"
                onKeyPress={this.addCommonAreaByEnter}
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

AddCommonArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  commonAreas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
  })).isRequired
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddCommonArea))
