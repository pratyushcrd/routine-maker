import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
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
    fontSize: '13px',
    lineHeight: '18.5px',
    marginLeft: theme.spacing.unit * 0.5,
  },
  periodsText: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    lineHeight: '14px',
  },
  periodsTextLight: {
    fontWeight: theme.typography.fontWeightLight,
  },
  periodsContainer: {
    marginTop: theme.spacing.unit / 4,
  },
  progressItem: {
    margin: 'auto',
  }
})

function getInitials(name) {
  // return name.split(' ').map(st => st[0]).slice(0, 2).join('')
  const nameArr = name.split(' ')
  return nameArr[0][0].toUpperCase() + (nameArr.length > 1 ? nameArr[nameArr.length - 1][0] : '').toUpperCase()
}

const TeacherCard = (props) => {
  const { classes, teacher = {}, maxPeriods } = props
  const periodsAssigned = teacher.periodsAssigned
  const progress = Math.round((periodsAssigned / maxPeriods) * 100)

  return (
    <ListItem
      button
      className={classes.listItem}
    >

      <Grid
        container
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography>
                {teacher.name}
                <span className={classes.idText}> {`(${teacher.id})`} </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.periodsContainer}>
          <Grid container>
            <Grid item xs={4}>
              <Typography className={classes.periodsText}>
                {`${periodsAssigned || 'No'} `} of {maxPeriods} periods
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.progressItem}>
              <LinearProgress variant="determinate" value={progress} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </ListItem>
  )
}

TeacherCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    periodsAssigned: PropTypes.number.isRequired,
    subjects: PropTypes.array.isRequired,
  }).isRequired,
  maxPeriods: PropTypes.number.isRequired,
}


export default withStyles(styles)(TeacherCard)
