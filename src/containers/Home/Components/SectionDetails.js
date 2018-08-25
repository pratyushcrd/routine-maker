import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'


const styles = theme => ({
  progress: {
    marginTop: theme.spacing.unit * 0.875,
    marginBottom: theme.spacing.unit * 0.75,
  },
  periodDetails: {
  },
  leftBox: {
    textAlign: 'center',
    margin: 'auto',
  },
  container: {
  },
  cardContent: {
    padding: theme.spacing.unit * 1.5,
    paddingBottom: `${theme.spacing.unit * 1.5}px !important`,
  }
})

/**
 * Component to render Section Details
 */
class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogueOpen: false,
    }
  }

  render() {
    const classes = this.props.classes
    const activeSection = this.props.activeSection
    const activeClass = this.props.activeClass
    const subjects = this.props.subjects
    const totalPeriods = +this.props.totalPeriods

    const periodsAssigned = subjects
      .map(subject => +subject.periodsPerWeek || 0)
      .reduce((a, b) => a + b, 0)
    const progressRatio = Math.round(100 * (periodsAssigned / totalPeriods))

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8} className={classes.container}>
            <Grid item xs={3} className={classes.leftBox}>
              <Typography variant="caption" component="h2">
                Name
              </Typography>
              <Typography variant="headline" component="h2">
                {activeClass} - {activeSection}
              </Typography>
            </Grid>
            <Grid item xs={9} >
              <Typography color="textSecondary" variant="caption">
                Periods Assigned
              </Typography>
              <div className={classes.progress}>
                <LinearProgress variant="determinate" value={progressRatio} />
              </div>
              <Typography variant="caption">
                {periodsAssigned} of {totalPeriods}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

Details.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  activeClass: PropTypes.string.isRequired,
  activeSection: PropTypes.string.isRequired,
  totalPeriods: PropTypes.number.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    section: PropTypes.string,
    subject: PropTypes.string,
  })).isRequired,
}

export default withStyles(styles)(Details)
