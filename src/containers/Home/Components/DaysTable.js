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
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

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
  },
  periodSelect: {
    borderBottom: '0px solid black !important',
  }
})

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

/**
 *
 * {day.periods} Component to render Section DaysTable
 */
class DaysTable extends React.Component {
  setPeriods = day => (event) => {
    const updateFn = this.props.updateDays
    updateFn(day.day, +event.target.value)
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

    const getDayTextClassName = day => (day.periods ? classes.periodsText : classes.periodsTextInactive)

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Periods</TableCell>
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
              <TableCell scope="row">
                <Select
                  value={String(day.periods)}
                  onChange={this.setPeriods(day)}
                  className={classes.periodSelect}
                >
                  {
                    Array(11).fill(0)
                      .map((a, i) => a + i)
                      .map(String)
                      .map(num => <MenuItem value={num} key={`@@${day}-${num}`}>{num}</MenuItem>)
                  }
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

DaysTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  updateDays: PropTypes.func.isRequired,
}

export default withStyles(styles)(DaysTable)
