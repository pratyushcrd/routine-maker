import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import GroupAdd from '@material-ui/icons/GroupAdd'
import PropTypes from 'prop-types'
import TeacherCard from './TeacherCard'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
  header: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1.5,
    marginTop: theme.spacing.unit ,
    marginBottom: -theme.spacing.unit ,
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
    minWidth: '90%',
  },
  textField: {
    
    marginTop: theme.spacing.unit * 0.5,
    minWidth: '90%',
    textAlign: 'start',
    
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit* 5,
    textAlign: 'center',
    minWidth: '90%',
    
  },
  displayAddTchrBtn:{
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit ,
    marginBottom: -theme.spacing.unit
  }
})

const TeacherArea = (props) => {
  const classes = props.classes
  const teachers = props.teachers
  const maxPeriods = Math.max(1, ...teachers.map(t => t.periodsAssigned))
  const addArea = (<Collapse in={props.displayAddTeacher}>
    <Grid
      container
      alignItems={'center'}
      justify={'center'}>
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <div>
            <TextField
            id="teacher"
            label="Name"
            className={classes.textField}
            margin="normal"
            />
          </div>
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <div >
            <TextField
              id="tid"
              label="Teacher ID"
              className={classes.textField}
              margin="normal"
            />
          </div>
        </FormControl>
      </form>
      <div>
        <Button
          variant="contained"
          mini
          color="primary"
          aria-label="add"
          onClick={()=>{}}
          className={classes.button}
        >
          Add
        </Button>
      </div>
    </Grid>
    <Divider />
  </Collapse>);
  return (
    <Paper className={classes.backPaper}>
      <Grid
        container
        alignItems={'center'}
        direction={'row'}
        justify={'flex-start'}
      >
        <Typography variant="subheading" className={classes.header}>
              Teachers
        </Typography>
        <IconButton component="span" className={classes.displayAddTchrBtn} onClick={props.toogleDisplayAddTeacher}>
          <GroupAdd />
        </IconButton>
        
        
      </Grid>
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
  )
}

TeacherArea.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}


export default withStyles(styles)(TeacherArea)
