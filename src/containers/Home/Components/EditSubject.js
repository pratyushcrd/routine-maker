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
import TextField from '@material-ui/core/TextField'

import SelectTeacher from './SelectTeacher'

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
class EditSubject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogueOpen: false,
      teacherDialogOpen: false,
      teacher: props.subject.teacherId || ''
    }
  }

  // Do certain operations when props change
  componentWillReceiveProps = props => {
    const teacherId = props.subject.teacherId || ''

    // Change teacherId to selected subject
    this.changeTeacher(teacherId)
  }

  changeTeacher = (teacherId) => this.setState({
    teacher: teacherId || ''
  })

  render() {
    const classes = this.props.classes
    const subject = this.props.subject
    const teachersMap = this.props.teachersMap
    const toggleEdit = this.props.toggleEdit

    const periodsPerWeek = subject.periodsPerWeek
    const subjectName = subject.subject
    const commonArea = subject.commonArea || 'N/A'
    const teacherId = this.state.teacher || ''
    const classLength = subject.classLength || 1

    const teacher = teacherId ? teachersMap[teacherId] : ({})

    const allTeachers = Object.entries(teachersMap)
      .map(arr => arr[1])

    const periodsPerWeekText = String(+periodsPerWeek || 0)

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              <TextField
                label="Edit Subject"
                defaultValue={subjectName}
                className={classes.subjectName}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.textRight}>
                  Class {subject.className} - {subject.section}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Typography>
                Select Teacher
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* Select teacher dialog */}
              <SelectTeacher
                teacher={teacher}
                changeTeacher={this.changeTeacher}
                allTeachers={allTeachers}
              />
              {/* <Typography
                className={classes.textRight}
                variant="body1"
                onClick={this.openTeachersDialog}
              >
                {teacherNameText} {teacherPeriodsText}
              </Typography> */}
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
          <Button size="small" color="primary">
            Save
          </Button>
          <Button size="small" color="primary" onClick={toggleEdit}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    )
  }
}

EditSubject.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  subject: PropTypes.shape({}).isRequired,
  teachersMap: PropTypes.shape({}).isRequired,
  toggleEdit: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditSubject)
