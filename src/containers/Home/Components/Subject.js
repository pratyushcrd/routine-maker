import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Face from '@material-ui/icons/Face'
// import WbIncandescent from '@material-ui/icons/WbIncandescent'


const styles = theme => ({
  periodDetails: {
  },
  editButton: {
    marginTop: '-2px',
    padding: '8px 10px',
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    fontSize: '12px',
    lineHeight: '10px',
  },
  container: {
    padding: 0,
  },
  subjectInfoContainer: {
    padding: 0,
    marginTop: theme.spacing.unit * 1,
  },
  subjectIcon: {
    color: theme.palette.text.secondary
  },
  teacherIcon: {
    paddingTop: '2.5px',
    color: theme.palette.text.secondary
  },
  teacherName: {
    fontSize: '12px',
    lineHeight: '14px',
    color: theme.palette.text.secondary
  },
  teacherDetails: {
    fontSize: '10px',
    lineHeight: '15px',
    color: theme.palette.text.secondary
  },
  subjectInfo: {
    textAlign: 'center',
    fontSize: '18px',
  },
  subjectInfoDesc: {
    textAlign: 'center',
    fontSize: '12px',
    color: theme.palette.text.secondary
  }
})

/**
 * Component to render Section Details
 */
class Subjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogueOpen: false,
    }
  }

  render() {
    const classes = this.props.classes

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={8}>
            <Grid item xs={2} >
              <Typography className={classes.teacherIcon}>
                {/* <WbIncandescent /> */}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subheading">
                English
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button size="small" color="primary" variant="text" className={classes.editButton}>
                Edit
              </Button>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid container spacing={8} className={classes.container}>
            <Grid item xs={2}>
              <Typography className={classes.teacherIcon}>
                <Face />
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography className={classes.teacherName}>
                Mr. Raman Raghav Rao
              </Typography>
              <Typography className={classes.teacherDetails}>
                (25 periods assigned)
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8} className={classes.subjectInfoContainer}>
            <Grid item xs={4}>
              <Typography className={classes.subjectInfo}>
                6
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Periods per Week
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.subjectInfo}>
                N/A
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Common Area
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.subjectInfo}>
                1
              </Typography>
              <Typography className={classes.subjectInfoDesc}>
                Class Length
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

Subjects.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Subjects)
