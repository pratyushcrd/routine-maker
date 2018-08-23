import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'


const styles = theme => ({
  progress: {
    paddingLeft: theme.spacing.unit / 4,
    paddingRight: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 0.75,
  },
  periodDetails: {
  },
  leftBox: {
    textAlign: 'center',
    margin: 'auto',
  },
  container: {
  },
  cardContent: {
    padding: theme.spacing.unit * 1.5,
    paddingBottom: `${theme.spacing.unit * 1.5}px !important`,
  }
})

/**
 * Component to render Section Details
 */
class Details extends React.Component {
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
          <Grid container spacing={8} className={classes.container}>
            <Grid item xs={2} className={classes.leftBox}>
              <Typography variant="headline" component="h2">
              1 - A
              </Typography>
              <Button size="small" color="secondary">
              Delete
              </Button>
            </Grid>
            <Grid item xs={10} >
              <Typography component="p" color="textSecondary" className={classes.periodDetails}>
                Periods Assigned
              </Typography>
              <div className={classes.progress}>
                <LinearProgress variant="determinate" value={8} />
              </div>
              <Typography component="p" color="textSecondary">
                25 of 40
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

Details.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Details)
