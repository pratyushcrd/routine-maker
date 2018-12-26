import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DaysTable from './DaysTable'
import CommonAreas from './CommonAreas'

import Info from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  detailBox: {
    padding: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 0.5,
  },
  detailTitle: {
    marginTop: theme.spacing.unit * 2,
  },
  infoIcon: {
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
})

/**
 * Component to render Section SchoolDetails
 */
class SchoolDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = this.props.classes
    const days = this.props.days
    const commonAreas = this.props.commonAreas
    const addCommonArea = this.props.addCommonArea

    return (<div>
      <Typography variant="caption">
        School Details
      </Typography>
      <Grid container className={classes.home}>
        <Grid item xs={6}>
          <Typography variant="subheading" className={classes.detailTitle}>
            School Working Days
            <Tooltip title="Assign school working days and their respective number of periods">
              <Info className={classes.infoIcon} viewBox="0 0 24 24" />
            </Tooltip>
          </Typography>
          <Paper className={classes.detailBox}>
            <DaysTable
              updateDays={this.props.updateDays}
              days={days}
            />
          </Paper>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Typography variant="subheading" className={classes.detailTitle}>
            Common Areas
            <Tooltip title="Common Areas may include ground, library, labs to be taken into account while making routine">
              <Info className={classes.infoIcon} viewBox="0 0 24 24" />
            </Tooltip>
          </Typography>
          <Paper className={classes.detailBox}>
            <CommonAreas
              commonAreas={commonAreas}
              addCommonArea={addCommonArea}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>)
  }
}

SchoolDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  updateDays: PropTypes.func.isRequired,
}

export default withStyles(styles)(SchoolDetails)
