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
import Popover from '@material-ui/core/Popover'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import InfoIcon from '@material-ui/icons/Info'

import MySnackbarContentWrapper from '../../common/SnackBarContent'

const flattenArray = (a, b) => a.concat(b)

const styles = theme => ({
  submitButton: {
    marginTop: theme.spacing.unit * 3,
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
    marginLeft: theme.spacing.unit * 0,
  },
  popover: {
    pointerEvents: 'none',
    width: '22%',
    display: 'block',
    marginLeft: 30,
    marginTop: -6,
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
      anchorEl: '',
    }
  }


  handleClose = () => {
    this.setState({ snackOpen: false })
  }
  /**
   * Handle change in inputs
   */
  handleChange = name => event => {
    let value = event.target.value
      .replace(/^\s+/, '')

    // Periods per week should be minimum 1
    if (name === 'periodsPerWeek') {
      value = value && String(Math.max(+value, 1))
    }

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
      if (!inputSub && inputPeriodsPerWeek) {
        this.displayWarning('Enter subject name')
      }
      if (!inputPeriodsPerWeek) {
        // this.displayWarning('Enter periods / week. You can change that for every section later')
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

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const chipsSections = this.state.sections.slice()
    const { anchorEl } = this.state
    const popoverOpen = Boolean(anchorEl)

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
              placeholder="ex. 1 or 2 or 10"
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
          <Grid item xs={11}>
            <TextField
              placeholder="ex. A or B or Alpha"
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
          <Grid item xs={1}>
            <IconButton color="primary" className={classes.iconButton} onClick={this.addSection}>
              <AddIcon />
            </IconButton>
          </Grid>

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
              Add subjects and its "periods per week"
              <IconButton
                size="small"
              >
                <InfoIcon
                  aria-owns={popoverOpen ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                />
              </IconButton>
              <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={popoverOpen}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={this.handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>Periods per week signifies the number</Typography>
                <Typography>of periods you want to assign for a</Typography>
                <Typography>particular subject in one week.</Typography>
              </Popover>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <div ref={this.subjectInputField}>
              <TextField
                placeholder={'ex. Maths or PT'}
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

          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <div ref={this.periodsPerWeekInputField}>
              <TextField
                placeholder={'ex. 6 or 7'}
                value={this.state.periodsPerWeek}
                onChange={this.handleChange('periodsPerWeek')}
                type="number"
                className={classes.typeBox}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                onKeyPress={callIfSeparator(this.addSubject)}
                onBlur={this.addSubject}
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            <IconButton color="primary" className={classes.iconButton} onClick={this.addSubject}>
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid container spacing={8} className={classes.chipContainer}>
            {this.state.subjects.map((subject, index) => (
              <Grid item key={['subjectsgrid', index].join('_')} >
                <Chip
                  label={`${subject.name} - ${subject.periodsPerWeek}`}
                  onDelete={this.removeItem('subjects', index)}
                  className={classes.chip}
                />
              </Grid>
            ))}
            {/* Chip to alert if no subjects is added */}
            {!this.state.subjects.length ? (
              <Grid item>
                <Chip
                  label="No subjects added"
                  className={classes.chip}
                />
              </Grid>
            ) : ''}
          </Grid>

          <br />
          <Grid item xs={12}>
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

