import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import 'react-select/dist/react-select.css'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import SelectWrapped from '../common/SelectWrapped'

const suggestions = [
  {
    value: 'mh123',
    label: 'Rakesh Kumar',
  }, {
    value: 'mh124',
    label: 'Byomkesh Kumar',
  }, {
    value: 'mh125',
    label: 'Mahesh Kumar',
  }
]

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
  state = {
    classTeacher: null,
    className: '',
    sections: [{
      name: '',
      teacher: ''
    }]
  }

  /**
   * Handle change in inputs
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  /**
   * Handle change in sections field
   * @param {Number} index Index of object in sections array
   * @param {string} attr Attribute to be altered
   */
  handleSection = (index, attr) => value => {
    const sections = this.state.sections.slice()
    const currentSection = sections[index]
    // Changing section data
    if (attr === 'name') {
      currentSection.name = value.target.value
    } else if (attr === 'teacher') {
      currentSection.teacher = value
    }
    // Add another entry if last entry is done
    if ((index === sections.length - 1) && currentSection.name && currentSection.teacher) {
      sections.push({
        name: '',
        teacher: ''
      })
    }
    this.setState({
      sections
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
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
                section
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" align="right" xs={6} className={classes.sectionHeading} >
                class teacher
              </Typography>
            </Grid>
          </Grid>

          {this.state.sections.map((section, index) => (
            <Grid
              container
              spacing={24}
              key={['sectionsgrid', index].join('_')}
            >
              <Grid item xs={4}>
                <TextField
                  placeholder="section"
                  value={section.name}
                  onChange={this.handleSection(index, 'name')}
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={8}>
                <div className={classes.teacherField}>
                  <Input
                    fullWidth
                    className={classes.teacherField}
                    inputComponent={SelectWrapped}
                    value={section.teacher}
                    onChange={this.handleSection(index, 'teacher')}
                    placeholder="class teacher"
                    id="react-select-classTeacher"
                    inputProps={{
                      name: 'react-select-classTeacher',
                      instanceId: 'react-select-classTeacher',
                      simpleValue: true,
                      options: suggestions,
                    }}
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
              onClick={this.addDays}
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
}

export default withStyles(styles)(AddClass)
