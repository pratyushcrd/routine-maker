import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import IncompleteIndicator from './IncompleteIndicator'

const styles = theme => ({
  noPadding: {
    padding: '0 !important',
  },
  subjectName: {
    fontWeight: 400,
  },
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
  subjectInfoContainer: {
    padding: 0,
    marginTop: theme.spacing.unit * 1.5,
  },
  subjectInfo: {
    textAlign: 'center',
    fontSize: '15px',
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
class Subject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogueOpen: false,
    }
  }

  render() {
    const { classes, subject, teachersMap, toggleEdit, deleteSubject } = this.props
    if (!subject) {
      return null
    }
    const periodsPerWeek = subject.periodsPerWeek
    const subjectName = subject.subject
    const commonArea = subject.commonArea || 'N/A'
    const teacherId = subject.teacherId || ''
    const classLength = subject.classLength || 1

    const teacher = teacherId && teachersMap[teacherId]

    const teacherNameText = teacher ? teacher.name : 'No teacher assigned'
    const periodsPerWeekText = String(+periodsPerWeek || 0)
    const teacherPeriodsText = teacher ?
      `has ${+teacher.periodsAssigned || 0} periods assigned`
      :
      'No details found'
    const incompleteMap = this.props.incompleteMap
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              <Grid container>
                <Grid item>
                  <Typography variant="title" className={classes.subjectName}>
                    {subjectName}
                  </Typography>
                </Grid>
                <IncompleteIndicator
                  type="subject"
                  count={incompleteMap.bySubject(subject)}
                />
              </Grid>
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
        <CardActions className={classes.actions} disableActionSpacing>
          {/* <IconButton aria-label="Edit">
            <EditIcon />
          </IconButton> */}
          <Button size="small" color="primary" onClick={toggleEdit}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={() => deleteSubject(subject.id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }
}

Subject.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  subject: PropTypes.shape({}).isRequired,
  teachersMap: PropTypes.shape({}).isRequired,
  toggleEdit: PropTypes.func.isRequired,
  incompleteMap: PropTypes.shape({}).isRequired,
  deleteSubject: PropTypes.func.isRequired,
}

export default withStyles(styles)(Subject)
