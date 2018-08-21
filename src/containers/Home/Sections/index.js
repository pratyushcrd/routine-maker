import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

function filterSubjectsBySection(subjects, sectionName) {
  return subjects
    .filter(({ section }) => sectionName === section)
}

function joinClasses(...params) {
  return params.join(' ')
}

const styles = theme => ({
  header: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  sectionsButton: {
    marginRight: theme.spacing.unit,
    background: '#fff',
    color: theme.palette.text.secondary,
  },
  sectionsButtonSelected: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
})

/**
 * Component to render Classes & School's Chips
 */
class Sections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const props = this.props
    const classes = props.classes
    const sections = this.props.sections
    const subjects = this.props.subjects
    const activeClass = this.props.activeClass
    const sectionBtnClass = classes.sectionsButton
    const sectionBtnClassActive = joinClasses(classes.sectionsButton, classes.sectionsButtonSelected)

    if (!sections.length) {
      sections.push({
        section: 'None'
      })
    }

    return (
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" className={classes.header}>
              Sections
          </Typography>
          {sections.map((section, index) => (
            <Button
              key={`class@@section@card@@${activeClass + section.section}`}
              variant="raised"
              section={section}
              subjects={filterSubjectsBySection(subjects, section.section)}
              className={index === 0 ? sectionBtnClassActive : sectionBtnClass}
            >
              {section.section}
            </Button>
          ))}
        </Grid>
      </Grid>
    )
  }
}

Sections.defaultProps = {
  activeClass: '',
}

Sections.propTypes = {
  activeClass: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
  })).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
    subject: PropTypes.string,
  })).isRequired,
  classes: PropTypes.shape({
  }).isRequired,
}

export default withStyles(styles)(Sections)
