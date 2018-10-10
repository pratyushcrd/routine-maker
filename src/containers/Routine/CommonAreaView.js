import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '95%',
    margin: 'auto',
    display: 'block',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    padding: 1,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    marginTop: 2
  },
  subjectContainer: {
    padding: '4px'
  },
  teacherName: {
    fontSize: 12,
    textAlign: 'center'
  },
  subjectName: {
    fontSize: 14,
    textAlign: 'center'
  }
})

function CommonAreaView(props) {
  const { classes, data } = props
  const { routine, commonArea } = data
  const maxPeriods = routine
    .map(it => it[1].length)
    .reduce((a, b) => Math.max(a, b), 0)
  const periodsArray = Array(maxPeriods)
    .fill(1)
    .map((a, i) => a + i)

  return (
    <div className={classes.root}>
      <Typography variant="subheading">
        Routine for Common Area: {commonArea}
      </Typography>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric />
              {
                periodsArray.map(periodsNo => (
                  <TableCell className={classes.subjectName}>P{periodsNo}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {routine.map(([day, dayRoutine]) => (
              <TableRow key={Math.random()}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                {
                  dayRoutine.map((subject) => {
                    if (!subject) {
                      return <TableCell />
                    }
                    return (<TableCell className={classes.subjectContainer}>
                      <div className={classes.subjectName}>
                        {subject.className}-{subject.section}
                      </div>
                      <div className={classes.teacherName}>
                        {subject.subject}
                      </div>
                    </TableCell>)
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

CommonAreaView.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(CommonAreaView)
