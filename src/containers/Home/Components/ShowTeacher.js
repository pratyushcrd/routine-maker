import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'

const styles = theme => ({
  teacherDetail: {
    marginTop: theme.spacing.unit
  },
})

function getInitials(name){
  const nameArr = name.split(" ")
  return nameArr[0][0].toUpperCase() + (nameArr.length > 1 ? nameArr[nameArr.length - 1][0] : '').toUpperCase()
}

const ShowTeacher = (props) => {
  const { classes, teacher = {} } = props
  return (
    <Grid
    container 
    spacing={16} 
    className = {classes.teacherDetail}
    >
      <Grid item xs={1}  >
      </Grid>
      <Grid item xs={3} container justify={'center'}
      alignItems={'center'} >
          <Avatar>{ ' ' + getInitials(teacher.name)}</Avatar>
      </Grid>
      <Grid item xs={7} >
          <Typography variant="body1">
              {teacher.name}
          </Typography>
          <Grid container
          direction={'row'}
          justify={'space-between'}
          alignItems={'flex-end'} 
          >
              <Grid item >
                  <Typography variant="caption">
                    {teacher.id.toUpperCase()}
                  </Typography>
              </Grid>
              <Grid item >
                  <Grid container
                  direction={'row'}
                  alignItems={'flex-end'} >
                      <Typography variant="title" >
                          3
                      </Typography>
                      <Typography >
                          /10
                      </Typography>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}

ShowTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teacher: PropTypes.object.isRequired,
}



export default withStyles(styles)(ShowTeacher)
