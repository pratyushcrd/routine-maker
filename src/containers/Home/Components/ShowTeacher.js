import React from 'react'
// import PropTypes from 'prop-types'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import { withStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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

function getTableEntries(teacher, index) {
  return (<Paper className={styles.paper}  key={teacher.id}>
    <Grid>{teacher.name} {teacher.id}</Grid>
  </Paper>)
}

function ShowTeacher(props) {
  const { classes, teachers = {} } = props
  return (
    <div>
      { teachers.map(getTableEntries) }
      { !teachers.length && getTableEntries(dummyDay, -1) }
    </div>
  )
}

ShowTeacher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
}



export default withStyles(styles)(ShowTeacher)
