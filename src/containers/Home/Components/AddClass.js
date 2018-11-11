import React from 'react'
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
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import MySnackbarContentWrapper from '../../common/SnackBarContent'

const flattenArray = (a, b) => a.concat(b)

const styles = theme => ({
  submitButton: {
    marginTop: theme.spacing.unit * -1.5,
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
    minWidth: '100%',
  },
  typeBox: {
    marginTop: theme.spacing.unit * 1,
    width: '100%',
  },
  titleBox: {
    marginTop: theme.spacing.unit * 2.5,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'start',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  container: {
    width: '90%',
    marginLeft: '3%',
  },
  sectionsGrid: {
    marginTop: theme.spacing.unit * 0,
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  chipContainer: {
    marginTop: -theme.spacing.unit,
  },
  sectionHeading: {
    marginBottom: theme.spacing.unit * 2,
  },
  iconButton: {
    marginLeft: theme.spacing.unit * 1,
  },
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
      if (!inputSub) {
        this.displayWarning('Enter at least one subject')
      }
      if (!inputPeriodsPerWeek) {
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
      this.displayWarning('Class name is mandatory')
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
    const chipsSections = this.state.sections.slice()

    if (!chipsSections.length) {
      chipsSections.push({
        name: 'No Sections Added',
        isNull: true,
      })
    }

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
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Typography variant="subheading" align="left" gutterBottom className={classes.sectionHeading} >
            Add class details
            </Typography>
            <Typography variant="caption" xs={6}>
              Class name
            </Typography>
            <TextField
              placeholder="Ex. 1 or 2 or 10"
              value={this.state.className}
              onChange={this.handleChange('className')}
              type="text"
              className={classes.typeBox}
              margin="none"
            />
            <Typography variant="caption" xs={6} className={classes.titleBox}>
              Add Sections
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              placeholder="Ex. A or B or Alpha"
              value={this.state.sectionInput}
              onChange={this.handleChange('sectionInput')}
              type="text"
              className={classes.typeBox}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              onKeyPress={callIfSeparator(this.addSection)}
            />
          </Grid>
          <IconButton color="primary" className={classes.iconButton} onClick={this.addSection}>
            <AddIcon />
          </IconButton>

          <Grid container className={classes.chipContainer}>
            {chipsSections.map((section, index) => (
              <Grid item key={['sectionsgrid', index].join('_')} >
                <Chip
                  label={section.name}
                  onDelete={!section.isNull ? this.removeItem('sections', index) : null}
                  className={classes.chip}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" xs={6} className={classes.titleBox}>
              Subjects
            </Typography>

            <div ref={this.subjectInputField}>
              <TextField
                placeholder={'subject'}
                value={this.state.subjectInput}
                onChange={this.handleChange('subjectInput')}
                type="text"
                className={classes.typeBox}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                onKeyPress={callIfSeparator(this.highlightPeriodsPerWeek)}
              />
            </div>

            <Typography variant="caption" xs={6} className={classes.titleBox}>
              Periods / Week
            </Typography>


            <div ref={this.periodsPerWeekInputField}>
              <TextField
                placeholder={`Periods / Week of ${this.state.subjectInput || 'subject'}`}
                value={this.state.periodsPerWeek}
                onChange={this.handleChange('periodsPerWeek')}
                type="number"
                className={classes.typeBox}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                onKeyPress={callIfSeparator(this.addSubject)}
              />
            </div>

          </Grid>

          <Grid container spacing={8}>
            {this.state.subjects.map((subject, index) => (
              <Grid item key={['subjectsgrid', index].join('_')} >
                <Chip
                  label={`${subject.name} / ${subject.periodsPerWeek}`}
                  onDelete={this.removeItem('subjects', index)}
                  className={classes.chip}
                />
              </Grid>
            ))}
          </Grid>

          <br />
          <Button
            variant="contained"
            mini
            color="primary"
            aria-label="add"
            onClick={this.validateAndSaveClass}
            className={classes.submitButton}
          >
          Add
          </Button>
        </Grid>
      </Paper>
    )
  }
}

AddClass.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.shape({})),
    sections: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,
  addClass: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddClass)

