import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import Snackbar from '@material-ui/core/Snackbar'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import MySnackbarContentWrapper from '../../common/SnackBarContent'

function onKeyPress(key, cb, prevDef) {
  return function (event) {
    if (event.key === key) {
      cb()
      prevDef && event.preventDefault()
    }
  }
}

const pick = attr => ob => ob[attr]

const trimNameToMatch = str => String(str || '')
  .toLowerCase()
  .replace(/[^0-9a-zA-Z]/g, '')

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3.4,
    marginLeft: theme.spacing.unit * 1,
  },
  leftIcon: {
    marginRight: theme.spacing.unit * 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 1,
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
  },
  iconSmall: {
    fontSize: 20,
  },
  formControl: {
    width: '100%',
  },
  deleteCommonArea: {
    paddingRight: `${theme.spacing.unit * 3}px !important`,
    textAlign: 'right !important'
  },
})

/**
 * Component to render Section CommonAreas
 */
class CommonAreas extends React.Component {
  state = {
    commonArea: '',
    error: '',
  }

  handleChange = name => event => this.setState({
    [name]: event.target.value,
  })

  handleSnackClose = () => this.setState({
    error: '',
  })

  addCommonArea = () => {
    const commonArea = this.state.commonArea.trim()
    const commonAreaLower = trimNameToMatch(commonArea)
    const commonAreas = this.props.commonAreas

    if (!commonArea) {
      return
    }

    const match = commonAreas
      .map(pick('name'))
      .map(trimNameToMatch)
      .some(item => item === commonAreaLower)

    if (match) {
      return this.setState({
        error: 'A common area with same name exists',
      })
    }

    if (commonArea.match(/[^0-9a-zA-Z ']/)) {
      return this.setState({
        error: 'Illegal characters in common area name',
      })
    }

    // No issues adding common area
    this.props.addCommonArea(commonArea)
    // Clear the common area name
    this.setState({
      commonArea: '',
    })
  }

  render() {
    const classes = this.props.classes
    const commonAreas = this.props.commonAreas

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!this.state.error}
          autoHideDuration={2500}
          onClose={this.handleSnackClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackClose}
            variant={'error'}
            message={this.state.error}
          />
        </Snackbar>
        <Grid container>
          <Grid item xs={9}>
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-name"
                  label="Common Area name"
                  className={classes.textField}
                  value={this.state.commonArea}
                  onChange={this.handleChange('commonArea')}
                  margin="normal"
                  variant="outlined"
                  onKeyPress={onKeyPress('Enter', this.addCommonArea, true)}
                />
              </FormControl>
            </form>
          </Grid>
          <Grid item>
            <IconButton color="primary" className={classes.button} onClick={this.addCommonArea}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <TableBody>
            {commonAreas.map(commonArea => (
              <TableRow key={`commonAreas@@${commonArea.name}`}>
                <TableCell scope="row">
                  {commonArea.name}
                </TableCell>
                <TableCell className={classes.deleteCommonArea}>
                  <IconButton
                    onClick={() => this.props.deleteCommonArea(commonArea.name)}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!commonAreas.length && (
              <TableRow>
                <TableCell scope="row">
                  No Common Area Added
                </TableCell>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

CommonAreas.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  addCommonArea: PropTypes.func.isRequired,
  deleteCommonArea: PropTypes.func.isRequired,
}

export default withStyles(styles)(CommonAreas)
