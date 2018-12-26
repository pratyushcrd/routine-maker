import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import GroupAdd from '@material-ui/icons/GroupAdd'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'

import TeacherCard from './TeacherCard'
import AddTeacher from './AddTeacher'

const styles = theme => ({
  header: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1.5,
    marginTop: theme.spacing.unit,
    marginBottom: -theme.spacing.unit,
  },
  displayAddTeacherBtn: {
    color: theme.palette.text.secondary,
  },
  infoText: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 1,
  },
  infoIcon: {
    fontSize: 18,
  }
})

const TeacherArea = (props) => {
  const classes = props.classes
  const teachers = props.teachers
  const totalPeriods = props.totalPeriods

  return (
    <Grid
      container
      alignItems={'center'}
      direction={'row'}
      justify={'flex-start'}
      className={classes.backPaperContainer}
    >

      <Grid
        item
        xs={12}
        className={classes.backPaper}
      >
        <Typography variant="subheading" className={classes.header}>
          Teachers
          <IconButton component="span" className={classes.displayAddTeacherBtn} onClick={props.toogleDisplayAddTeacher}>
            <GroupAdd />
          </IconButton>
        </Typography>
        <List>
          <Divider />
          <AddTeacher
            show={props.displayAddTeacher}
            addTeacherFunc={props.addTeacherFunc}
            teachers={teachers}
          />

          {
            teachers.map(teacher => (
              <div key={['@@teacher-', teacher.id]}>
                <TeacherCard
                  teacher={teacher}
                  maxPeriods={totalPeriods}
                  totalPeriods={totalPeriods}
                />
              </div>
            ))
          }
          {
            teachers.length ? '' : <Typography variant="body1" className={classes.infoText}>
              Click <GroupAdd className={classes.infoIcon} viewBox="0 -4 24 24" /> icon to add teacher
            </Typography>
          }
        </List>
      </Grid>

    </Grid>


  )
}

TeacherArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  displayAddTeacher: PropTypes.bool.isRequired,
  toogleDisplayAddTeacher: PropTypes.func.isRequired,
  addTeacherFunc: PropTypes.func.isRequired,
  totalPeriods: PropTypes.number.isRequired,
}


export default withStyles(styles)(TeacherArea)
