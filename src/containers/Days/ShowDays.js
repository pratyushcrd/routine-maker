import React from 'react'
// import PropTypes from 'prop-types'
import PropTypes from 'prop-types'
import { connect, } from 'react-redux'
import Table from '@material-ui/core/Table'
import { withStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
})

function ShowDays(props) {
  const { classes, days = {} } = props
  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Periods</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { days.map((day) => (
            <TableRow key={day.day}>
              <TableCell>{day.day}</TableCell>
              <TableCell>{day.periods}</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </Paper>
  )
}

ShowDays.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function mapStateToProperties(state) {
  return state.input
}

export default connect(mapStateToProperties)(withStyles(styles)(ShowDays))
