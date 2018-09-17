import React from 'react'
import { connect, } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import 'react-select/dist/react-select.css'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import Chip from '@material-ui/core/Chip'

import MySnackbarContentWrapper from '../common/SnackBarContent'

const flattenArray = (a, b) => a.concat(b)

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
    minWidth: '100%',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'start',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  textField: {
    textAlign: 'start',
    width: '100%',
  },
  container: {
    width: '90%',
    marginLeft: '3%',
  },
  sectionHeading: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: -theme.spacing.unit,
  },
  sectionsGrid: {
    marginTop: theme.spacing.unit * 0,
  }
})

const inputSeperators = {
  Enter: 1,
  ',': 1
}

/**
 * A function that takes a callback and return a function which waits
 * for event and executes the callback if event key is a separator
*/
function callIfSeparator(callback) {
  return function (event) {
    if (inputSeperators[event.key]) {
      callback(event)
    }
  }
}

/**
 * Component to render Add View for classes
 */
class AddClass extends React.Component {
  constructor() {
    super()
    this.subjectInputField = React.createRef()
    this.periodsPerWeekInputField = React.createRef()
    this.state = {
      className: '',
      subjectInput: '',
      sectionInput: '',
      sections: [],
      subjects: [],
      snackOpen: false,
      snackVariant: '',
      snackMessage: '',
      periodsPerWeek: '',
    }
  }


  handleClose = () => {
    this.setState({ snackOpen: false })
  }
  /**
   * Handle change in inputs
   */
  handleChange = name => event => {
    const value = event.target.value
      .replace(/^\s+/, '')
    const lastLetter = value.substr(-1)
    // if last key entered is a separator
    if (!inputSeperators[lastLetter]) {
      this.setState({
        [name]: value
      })
    }
  }

  removeItem = (type, index) => (() => {
    const temp = this.state[type].slice()
    temp.splice(index, 1)
    this.setState({ [type]: temp })
  })

  highlightPeriodsPerWeek = () => {
    this.periodsPerWeekInputField.current.querySelector('input').focus()
  }

  addSubject = () => {
    const inputSub = this.state.subjectInput.trim()
    const inputPeriodsPerWeek = Number(this.state.periodsPerWeek.trim())
    if (inputSub && inputPeriodsPerWeek) {
      if (this.state.subjects.some(sub => sub.name === inputSub)) {
        this.displayWarning(`Subject '${inputSub.toUpperCase()}' is added more than once. Please remove extras.`)
      } else {
        const subjects = this.state.subjects.slice()
        subjects.push({ name: inputSub, periodsPerWeek: inputPeriodsPerWeek })
        this.setState({
          subjects,
          subjectInput: '',
          periodsPerWeek: '',
        }, () => this.subjectInputField.current.querySelector('input').focus())
      }
    } else {
      if(!inputSub){
        this.displayWarning('Enter at least one subject')
      }
      if(!inputPeriodsPerWeek){
        this.displayWarning('Enter periods / week. You can change that for every section later')
      }
    }
  }

  addSection = () => {
    const input = this.state.sectionInput.trim()
    if (input) {
      if (this.state.sections.some(sec => sec.name === input)) {
        this.displayWarning(`Section '${input.toUpperCase()}' is added more than once. Please remove extras.`)
      } else {
        const sections = this.state.sections.slice()
        sections.push({ name: input })
        this.setState({
          sections,
          sectionInput: '',
        })
      }
    } else {
      this.displayWarning('Enter at least one section')
    }
  }

  displayWarning = (message) => {
    this.setState({
      snackOpen: true,
      snackMessage: message,
      snackVariant: 'warning',
    })
  }

  validateAndSaveClass = () => {
    if (!this.state.className.trim()) {
      this.displayWarning('Clas name is mandatory')
      return
    }
    if (this.state.subjects.length < 1) {
      this.displayWarning('Enter at least one subject')
      return
    }
    if (this.state.sections.length < 1) {
      this.displayWarning('Enter at least one section')
      return
    }
    this.updateClassAndSection()
  }

  updateClassAndSection = () => {
    if (this.props.classList.some((cls) => cls.className === this.state.className)) {
      this.displayWarning(`Class: '${this.state.className}' is already present`)
      return
    }

    const className = this.state.className.trim()

    // get all sections in proper format
    const sections = this.state.sections.map(({ name: section }) => ({
      className,
      section
    }))
    // get all sections in proper format
    const subjects = sections.map(({ section }) =>
      this.state.subjects.map(({ name: subject, periodsPerWeek }) => ({
        className,
        section,
        subject,
        periodsPerWeek
      }))
    ).reduce(flattenArray, [])

    // Dispatch action to save class
    this.props.addClass({
      className,
      sections,
      subjects,
    })
    // Clear common area name and count
    this.setState({
      className: '',
      sections: [],
      subjects: [],
      snackOpen: false,
      snackVariant: '',
      snackMessage: '',
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
        <div className={classes.container}>
          <Typography variant="caption" align="left" gutterBottom className={classes.textField}>
          Add class details
          </Typography>
          { /* A new line if class name is present */ }
          { this.state.className && <br /> }
          <TextField
            label="class name"
            value={this.state.className}
            onChange={this.handleChange('className')}
            type="text"
            className={classes.textField}
            margin="none"
          />

          <Grid container spacing={24} className={classes.sectionsGrid}>
            <Grid item xs={6}>
              <Typography variant="caption" xs={6} className={classes.sectionHeading} >
                Section(s)
              </Typography>
            </Grid>
          </Grid>

          <TextField
            placeholder={'section '}
            value={this.state.sectionInput}
            onChange={this.handleChange('sectionInput')}
            type="text"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onKeyPress={callIfSeparator(this.addSection)}
          />

          <Grid container spacing={8}>

            {this.state.sections.map((section, index) => (
              <Grid item key={['sectionsgrid', index].join('_')} >
                <Chip
                  label={section.name}
                  onDelete={this.removeItem('sections', index)}
                  className={classes.chip}
                />
              </Grid>
            ))}

          </Grid>

          <Grid container spacing={24} className={classes.sectionsGrid}>
            <Grid item xs={6}>
              <Typography variant="caption" xs={6} className={classes.sectionHeading} >
                Subjects
              </Typography>
            </Grid>
          </Grid>
          <div ref={this.subjectInputField}>
            <TextField
              placeholder={'subject'}
              value={this.state.subjectInput}
              onChange={this.handleChange('subjectInput')}
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              onKeyPress={callIfSeparator(this.highlightPeriodsPerWeek)}
            />
          </div>
          <Grid container spacing={24} className={classes.sectionsGrid}>
            <Grid item xs={6}>
              <Typography variant="caption" xs={6} className={classes.sectionHeading} >
                Periods / Week
              </Typography>
            </Grid>
          </Grid>
          <div ref={this.periodsPerWeekInputField}>
            <TextField
              placeholder={'Periods / Week of ' + (this.state.subjectInput || 'subject')}
              value={this.state.periodsPerWeek}
              onChange={this.handleChange('periodsPerWeek')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              onKeyPress={callIfSeparator(this.addSubject)}
            />
          </div>
          <Grid container spacing={8}>

            {this.state.subjects.map((subject, index) => (
              <Grid item key={['subjectsgrid', index].join('_')} >
                <Chip
                  label={subject.name + ' / ' + subject.periodsPerWeek }
                  onDelete={this.removeItem('subjects', index)}
                  className={classes.chip}
                />
              </Grid>
            ))}

          </Grid>
          <br />
          <div>
            <Button
              variant="contained"
              mini
              color="primary"
              aria-label="add"
              onClick={this.validateAndSaveClass}
              className={classes.button}
            >
            Add
            </Button>
          </div>
        </div>
      </Paper>
    )
  }
}

AddClass.defaultProps = {
  classes: {}
}

AddClass.propTypes = {
  classes: PropTypes.shape({}),
  classList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.shape({})),
    sections: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,
  addClass: PropTypes.func.isRequired,
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddClass))

