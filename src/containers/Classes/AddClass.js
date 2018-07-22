import React from 'react'
import { connect, } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import 'react-select/dist/react-select.css'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import MySnackbarContentWrapper from '../common/SnackBarContent'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
    minWidth: '100%',
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
    textAlign: 'start',
    width: '100%',
  },
  teacherField: {
    textAlign: 'start',
    marginTop: theme.spacing.unit * 0.85,
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

/**
 * Component to render Add View for classes
 */
class AddClass extends React.Component {
  constructor() {
    super()
    this.state = {
    className: '',
    sections: [{
      name: '',
    }],
    subjects: [{
      name: '',
    }],
    snackOpen: false,
    snackVariant: '',
    snackMessage: '',
    }

  this.sectionsRef = [React.createRef()]
  this.subjectsRef = [React.createRef()]
  }


  handleClose = () => {
    this.setState({ snackOpen: false })
  }
  /**
   * Handle change in inputs
   */
  handleChange = name => event => {
    let value = event.target.value
    value = value.replace(/^\s+/, '')
    this.setState({
      [name]: value,
    })
  }

  /**
   * Handle change in sections field
   * @param {Number} index Index of object in sections array
   */
  handleSection = (index) => value => {
    const sections = this.state.sections.slice()
    const currentSection = sections[index]
    currentSection.name = value.target.value
    // Add another entry if last entry is done
    if ((index === sections.length - 1) && currentSection.name) {
      sections.push({
        name: '',
      })
      this.sectionsRef.push(React.createRef());
    }
    this.setState({
      sections
    })
  }

    /**
   * Handle change in sections field
   * @param {Number} index Index of object in sections array
   */
  handleSubject = (index) => value => {
    const subjects = this.state.subjects.slice()
    const currentSubject = subjects[index]
    currentSubject.name = value.target.value
    // Add another entry if last entry is done
    if ((index === subjects.length - 1) && currentSubject.name) {
      subjects.push({
        name: '',
      })
      this.subjectsRef.push(React.createRef());
    }
    this.setState({
      subjects
    })
  }

  shiftFocus = (from, index)=>{
    if(from === 'className'){
      this.state.className.trim() ?
      this.subjectsRef[0].current.querySelector('input').focus() : this.displayWarning('Clas name is mandatory')
    }
    else if(from === 'subjects'){
      if(this.state.subjects[index].name.trim()){
        this.subjectsRef[index + 1].current.querySelector('input').focus()
      }
      else{
        index === 0 ? this.displayWarning('Enter at least one subject') : this.sectionsRef[0].current.querySelector('input').focus();
      }
    }
    else if(from === 'sections'){
      if(this.state.sections[index].name.trim()){
        this.sectionsRef[index + 1].current.querySelector('input').focus()
      }
      else{
        index === 0 ? this.displayWarning('Enter at least one section') : this.updateClassAndSection();
      }
    }

  }

  displayWarning = (message) => {
    this.setState({
      snackOpen: true,
      snackMessage: message,
      snackVariant: 'warning',
    })
  }

  validateAndSaveClass = () =>{
    if(!this.state.className.trim()){
      this.displayWarning('Clas name is mandatory')
      return
    }
    if(this.state.subjects.filter((sub) => sub.name).length < 1){
      this.displayWarning('Enter at least one subject')
      return
    }
    if(this.state.sections.filter((sec) => sec.name).length < 1){
      this.displayWarning('Enter at least one section')
      return
    }
    this.updateClassAndSection()
  }

  updateClassAndSection = () => {
    if(this.props.classList.some((cls)=> cls.className == this.state.className)){
      this.displayWarning("Class: '" + this.state.className + "' is already present")
      return
    }
    // Dispatch action to save common area
    this.props.dispatch({
      type: 'ADD_CLASS',
      className: this.state.className.trim(),
      subjects: this.state.subjects.filter((sub) => sub.name).map((sub) => ({name: sub.name.trim()})),
      sections: this.state.sections.filter((sec) => sec.name).map((sec) => ({name: sec.name.trim()})),
    })
    // Clear common area name and count
    this.setState({
      className: '',
      sections: [{
        name: '',
      }],
      subjects: [{
        name: '',
      }],
      snackOpen: false,
      snackVariant: '',
      snackMessage: '',
      })
      console.log(this.props.classList);
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
            onKeyPress={(event) =>{event.key === 'Enter' && this.shiftFocus('className')}}
          />
          <Grid container spacing={24} className={classes.sectionsGrid}>
            <Grid item xs={6}>
              <Typography variant="caption" xs={6} className={classes.sectionHeading} >
                Subjects
              </Typography>
            </Grid>
          </Grid>
          {this.state.subjects.map((subject, index) => (
            <Grid
              container
              spacing={24}
              key={['subjectsgrid', index].join('_')}
            >
              <Grid item xs={12}>
              <div ref={this.subjectsRef[index]}>
                <TextField
                  placeholder={"subject " + (index + 1)}
                  value={subject.name}
                  onChange={this.handleSubject(index)}
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  onKeyPress={(event) =>{event.key === 'Enter' && this.shiftFocus('subjects', index)}}
                />
                </div>
              </Grid>
            </Grid>
          ))}

          <Grid container spacing={24} className={classes.sectionsGrid}>
            <Grid item xs={6}>
              <Typography variant="caption" xs={6} className={classes.sectionHeading} >
                Section(s)
              </Typography>
            </Grid>
          </Grid>

          {this.state.sections.map((section, index) => (
            <Grid
              container
              spacing={24}
              key={['sectionsgrid', index].join('_')}
            >
              <Grid item xs={12}>
              <div ref={this.sectionsRef[index]}>
                <TextField
                  placeholder={"section " + (index + 1)}
                  value={section.name}
                  onChange={this.handleSection(index)}
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  onKeyPress={(event) =>{event.key === 'Enter' && this.shiftFocus('sections', index)}}
                />
              </div>
              </Grid>
            </Grid>
          ))}

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
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(AddClass))

