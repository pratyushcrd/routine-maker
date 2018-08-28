import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
// import Face from '@material-ui/icons/Face'
// import WbIncandescent from '@material-ui/icons/WbIncandescent'


const styles = theme => ({
  periodDetails: {
  },
  editButton: {
    marginTop: '-4px',
    marginRight: -theme.spacing.unit,
    float: 'right',
    padding: '8px 10px',
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    fontSize: '13px',
    lineHeight: '13px',
  },
  container: {
    padding: 0,
  },
  subjectInfoContainer: {
    padding: 0,
    marginTop: theme.spacing.unit * 1,
  },
  subjectIcon: {
    color: theme.palette.text.secondary
  },
  teacherIcon: {
    paddingTop: '2.5px',
    color: theme.palette.text.secondary
  },
  teacherName: {
    fontSize: '13px',
    lineHeight: '14px',
    color: theme.palette.text.primary
  },
  teacherDetails: {
    fontSize: '10px',
    lineHeight: '15px',
    color: theme.palette.text.secondary
  },
  subjectInfo: {
    textAlign: 'center',
    fontSize: '18px',
  },
  subjectInfoDesc: {
    textAlign: 'center',
    fontSize: '13px',
    color: theme.palette.text.secondary
  }
})

/**
 * Component to render Section Details
 */
class Subjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogueOpen: false,
    }
  }

  render() {
    const classes = this.props.classes
    const subject = this.props.subject
    const teachersMap = this.props.teachersMap

    const periodsPerWeek = subject.periodsPerWeek
    const subjectName = subject.subject
    const commonArea = subject.commonArea || 'N/A'
    const teacherId = subject.teacherId || ''
    const classLength = subject.classLength || 1

    const teacher = teacherId && teachersMap[teacherId]

    const teacherNameText = teacher ? teacher.name : 'No teacher assigned'
    const periodsPerWeekText = String(+periodsPerWeek || 0)
    const teacherPeriodsText = teacher ?
      `(${+teacher.periodsPerWeek || 0} periods assigned)`
      :
      ''

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8}>
            <Grid item xs={10}>
              <Typography variant="subheading">
                {subjectName}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button size="small" color="primary" variant="text" className={classes.editButton}>
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.container}>
            <Grid item xs={12}>
              <Typography className={classes.teacherName}>
                {teacherNameText}
              </Typography>
              <Typography className={classes.teacherDetails}>
                {teacherPeriodsText}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.subjectInfoContainer}>
            <Grid item xs={4}>
              <Typography className={classes.subjectInfo}>
                {periodsPerWeekText}
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Periods per Week
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.subjectInfo}>
                {commonArea}
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Common Area
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.subjectInfo}>
                {classLength}
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Class Length
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

Subjects.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  subject: PropTypes.shape({}).isRequired,
  teachersMap: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Subjects)
