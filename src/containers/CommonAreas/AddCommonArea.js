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
    this.state = {
      name: '',
      snackOpen: false,
      snackVariant: '',
      snackMessage: '',
    }
  }

  handleChange = name => event => {
    let value = event.target.value
    value = value.replace(/^\s+/, '')
    this.setState({
      [name]: value,
    })
  };

  handleClose = () => {
    this.setState({ snackOpen: false })
  }

  addCommonAreas = () => {
    const name = this.state.name
    if (!name) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Fields cannot be blank',
        snackVariant: 'warning',
      })
      return
    }
    if(this.props.commonAreas.some((commonArea)=> commonArea.name.toLowerCase() === name.toLowerCase())){
      this.setState({
        snackOpen: true,
        snackMessage: "'" + name + "' is already present",
        snackVariant: 'warning',
      })
      return
    }
    // Dispatch action to save common area
    this.props.dispatch({
      type: 'ADD_COMMON_AREA',
      name: this.state.name,
    })
    // Clear common area name and count
    this.setState({
      name: '',
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
          Add Common Area
        </Typography>
        <form autoComplete="off">
          <FormControl className={classes.formControl}>
            <div ref={this.commonAreaName}>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                onKeyPress={(event) =>{if(event.key === 'Enter'){this.addCommonAreas(); event.preventDefault()}}}
              />
            </div>
          </FormControl>
          <br />
        </form>
        <div>
          <Button
            variant="contained"
            mini
            color="primary"
            aria-label="add"
            onClick={this.addCommonAreas}
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
  })).isRequired
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddCommonArea))
