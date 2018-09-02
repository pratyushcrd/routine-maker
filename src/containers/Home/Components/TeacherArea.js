import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import GroupAdd from '@material-ui/icons/GroupAdd'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'

import TeacherCard from './TeacherCard'

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
  formControl: {
    minWidth: '100%',
  },
  textField: {

    marginTop: theme.spacing.unit * 0.5,
    textAlign: 'start',

  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    textAlign: 'center',
  },
  displayAddTeacherBtn: {
    color: theme.palette.text.secondary,
  },
  formArea: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    minWidth: '100%',
  },
  addTeacherLabel: {
    textAlign: 'flex-start',
    fontSize: '13px',
    color: theme.palette.text.secondary,
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  }
})

const TeacherArea = (props) => {
  const classes = props.classes
  const teachers = props.teachers
  const maxPeriods = Math.max(1, ...teachers.map(t => t.periodsAssigned))
  const addArea = (<Collapse in={true || props.displayAddTeacher}>
    <Grid
      container
      alignItems={'center'}
      justify={'flex-start'}

    >
      <Grid item xs={12}>
        <Typography className={classes.addTeacherLabel}>
          Add Teacher
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <form autoComplete="off" className={classes.formArea}>
          <Grid
            container
          >
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="teacher"
                  label="Name"
                  className={classes.textField}
                  margin="normal"
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>

                <TextField
                  id="tid"
                  label="Teacher ID"
                  className={classes.textField}
                  margin="normal"
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                mini
                color="primary"
                aria-label="add"
                onClick={() => { }}
                className={classes.button}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
    <Divider />
  </Collapse>)
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
            {addArea}

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
}


export default withStyles(styles)(TeacherArea)
