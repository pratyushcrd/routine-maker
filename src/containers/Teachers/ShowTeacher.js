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

const dummyDay = {
  key: 'none',
  name: 'No teacher added',
  id: '',
}

function getTableEntries(teacher) {
  return (<TableRow key={teacher.id}>
    <TableCell>{teacher.name}</TableCell>
    <TableCell>{teacher.id}</TableCell>
  </TableRow>)
}

function ShowTeacher(props) {
  const { classes, teachers = {} } = props
  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Teacher Name</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { teachers.map(getTableEntries) }
          { !teachers.length && getTableEntries(dummyDay) }
        </TableBody>
      </Table>
    </Paper>
  )
}

ShowTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function mapStateToProperties(state) {
  return state.input
}

export default connect(mapStateToProperties)(withStyles(styles)(ShowTeacher))
