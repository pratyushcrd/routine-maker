import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add'

import SectionCard from './Card'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    display: 'flex-root',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
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
    const activeClass = this.props.activeClass

    if (!sections.length) {
      sections.push({
        section: 'None'
      })
    }

    return (
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" gutterBottom>
              Sections
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.root}>
            <Typography variant="subheading" gutterBottom> Details </Typography>
            <Typography> Class Name: {activeClass} </Typography>
          </Paper>
        </Grid>
        {sections.map(section => (
          <Grid item xs={6} key={`class@@section@card@@${activeClass + section}`} >
            <SectionCard
              classes={classes}
              section={section}
              subjects={this.props.subjects[section.name] || [{
                subject: 'None'
              }]}
            />
          </Grid>
        ))}
        <Grid item xs={12} >
          <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    )
  }
}

Sections.propTypes = {
  activeClass: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    section: PropTypes.string.isRequired,
  })).isRequired,
  subjects: PropTypes.objectOf(PropTypes.shape({})).isRequired,
}

export default withStyles(styles)(Sections)
