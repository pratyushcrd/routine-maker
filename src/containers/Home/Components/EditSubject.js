import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
  infoDivider: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
    height: '85%',
    marginTop: '-43%',
    marginLeft: '-5%',
  },
  periodsText: {
    marginTop: -theme.spacing.unit * 1,
  },
  divider: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  textRight: {
    textAlign: 'right',
  },
  cardContent: {
    // padding: theme.spacing.unit * 2,
  },
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
    marginTop: theme.spacing.unit * 1.5,
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
class EditSubject extends React.Component {
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
      `has ${+teacher.periodsPerWeek || 0} periods assigned`
      :
      'No details found'

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              <Typography variant="title">
                {subjectName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.textRight}>
                  Class {subject.className} - {subject.section}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <Typography>
                Teacher
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography
                className={classes.textRight}
                variant="body1"
              >
                {teacherNameText}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <Typography
                className={[classes.textRight, classes.periodsText].join(' ')}
                variant="caption"

              >
                {teacherPeriodsText}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.subjectInfoContainer}>
            <Grid item xs={4}>
              <Typography variant="body1" className={classes.subjectInfo}>
                {periodsPerWeekText}
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Periods / Week
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" className={classes.subjectInfo}>
                {commonArea}
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Common Area
              </Typography>
              <div className={classes.infoDivider} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" className={classes.subjectInfo}>
                {classLength}
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Class Length
              </Typography>
              <div className={classes.infoDivider} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

EditSubject.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  subject: PropTypes.shape({}).isRequired,
  teachersMap: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(EditSubject)
