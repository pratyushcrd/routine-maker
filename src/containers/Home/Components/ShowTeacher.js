import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types'

const styles = theme => ({
  teacherDetail: {
    marginTop: theme.spacing.unit
  },
  listItem: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  idText: {
    color: theme.palette.text.secondary,
    fontSize: '12px',
    lineHeight: '18.5px',
    marginLeft: theme.spacing.unit * 0.5,
  },
  periodsText: {
    color: theme.palette.text.secondary,
    fontSize: '11px',
    lineHeight: '14px',
  },
  periodsContainer: {
    marginTop: theme.spacing.unit / 4,
  },
  progressItem: {
    margin: 'auto',
  }
})

function getInitials(name) {
  const nameArr = name.split(' ')
  return nameArr[0][0].toUpperCase() + (nameArr.length > 1 ? nameArr[nameArr.length - 1][0] : '').toUpperCase()
}

const ShowTeacher = (props) => {
  const { classes, teacher = {} } = props
  return (
    <ListItem
      button
      className={classes.listItem}
    >

      <Grid
        container
        // direction={'row'}
        // justify={'space-between'}
        // alignItems={'flex-end'}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography>
                {teacher.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.idText}>
                {`(${teacher.id.toUpperCase()})`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.periodsContainer}>
          <Grid container>
            <Grid item xs={4}>
              <Typography className={classes.periodsText}>
                {'25 periods assigned'}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.progressItem}>
              <LinearProgress variant="determinate" value={50} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </ListItem>
  )
}

ShowTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teacher: PropTypes.object.isRequired,
}


export default withStyles(styles)(ShowTeacher)
