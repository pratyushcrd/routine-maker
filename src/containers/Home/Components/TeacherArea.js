import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
  backPaperContainer: {
    height: '100%',
  },
  backPaper: {
    height: '100%',
    // padding: theme.spacing.unit * 0,
    marginBottom: theme.spacing.unit * 2.5,
  },
  displayAddTeacherBtn: {
    color: theme.palette.text.secondary,
  }
})

const TeacherArea = (props) => {
  const classes = props.classes
  const teachers = props.teachers
  const maxPeriods = Math.max(1, ...teachers.map(t => t.periodsAssigned))
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
        xs={2}
      />

      <Grid
        item
        xs={10}
        className={classes.backPaper}
      >

        <Paper className={classes.backPaper}>
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
                    maxPeriods={maxPeriods}
                  />
                </div>
              ))
            }
          </List>
        </Paper>
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
}


export default withStyles(styles)(TeacherArea)
