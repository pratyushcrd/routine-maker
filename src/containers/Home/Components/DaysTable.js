import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

function getTextColor(periods) {
  return periods ? 'default' : 'default'
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  periodsTextInactive: {
    fontWeight: 'lighter',
  },
  periodsText: {
    fontWeight: 500,
  },
  actionIcon: {
    fontSize: 20,
  }
})

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

/**
 * Component to render Section Blank
 */
class Blank extends React.Component {
  constructor(props) {
    super(props)
  }

  increasePeriods = day => () => {
    const updateFn = this.props.updateDays
    updateFn(day.day, day.periods + 1)
  }

  decreasePeriods = day => () => {
    const updateFn = this.props.updateDays
    updateFn(day.day, Math.max(day.periods - 1, 0))
  }

  render() {
    const classes = this.props.classes
    const propsDaysMap = this.props.days
      .reduce((acc, day) => {
        acc[day.day] = day
        return acc
      }, {})

    const days = weekDays.map(dayName => propsDaysMap[dayName] || ({
      day: dayName,
      periods: 0,
    }))

    const getDayTextClassName = day => day.periods ? classes.periodsText : classes.periodsTextInactive

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell numeric>Periods</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map(day => (
            <TableRow key={`days@@${day.day}`}>
              <TableCell scope="row">
                <Typography color={getTextColor(day.periods)} className={getDayTextClassName(day)}>
                  {day.day}
                </Typography>
              </TableCell>
              <TableCell numeric>
                <Typography color={getTextColor(day.periods)} className={getDayTextClassName(day)}>
                  {day.periods}
                </Typography>
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item xs={6}>
                    <IconButton
                      aria-label="Increase"
                      onClick={this.increasePeriods(day)}
                    >
                      <AddIcon className={classes.actionIcon} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
                      aria-label="Decrease"
                      onClick={this.decreasePeriods(day)}
                    >
                      <RemoveIcon className={classes.actionIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

Blank.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  updateDays: PropTypes.func.isRequired,
}

export default withStyles(styles)(Blank)
