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

const styles = theme => ({
  header: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1.5,
    marginTop: theme.spacing.unit * 2,
  },
  backPaperContainer: {
    height: '100%',
  },
  backPaper: {
    height: '100%',
    // padding: theme.spacing.unit * 0,
    marginBottom: theme.spacing.unit * 2.5,
  },
})

const TeacherArea = (props) => {

  const classes = props.classes
  return (
    <Paper className={classes.backPaper}>
      <Grid
        container
        alignItems={'flex-end'}
        direction={'row'}
        justify={'flex-start'}
      >
        <Typography variant="subheading" className={classes.header}>
              Teachers
        </Typography>
        <GroupAdd className={classes.header} />
      </Grid>
      <List>
        <Divider />
        {
          props.teachers.map((v, i) => (
            <div key={['@@teacher-', i]}>
              <TeacherCard teacher={v} />
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
