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

const data = {
  className: '1',
  section: 'A',
  routine: [
    [
      'Monday',
      [
        {
          subject: 'English',
          teacher: 'Suresh Deshpandey Choudhary',
          teacherId: 'sd121'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Hindi',
          teacher: 'Hima Das',
          teacherId: 'hm23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'English',
          teacher: 'Suresh Deshpandey Choudhary',
          teacherId: 'sd121'
        },
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        },
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        }
      ]
    ],
    [
      'Tuesday',
      [
        {
          subject: 'English',
          teacher: 'Suresh Deshpandey Choudhary',
          teacherId: 'sd121'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Hindi',
          teacher: 'Hima Das',
          teacherId: 'hm23'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        }
      ]
    ],
    [
      'Wednesday',
      [
        {
          subject: 'English',
          teacher: 'Suresh Deshpandey Choudhary',
          teacherId: 'sd121'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Hindi',
          teacher: 'Hima Das',
          teacherId: 'hm23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        },
        {
          subject: 'Hindi',
          teacher: 'Hima Das',
          teacherId: 'hm23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        }
      ]
    ],
    [
      'Thursday',
      [
        {
          subject: 'English',
          teacher: 'Suresh Deshpandey Choudhary',
          teacherId: 'sd121'
        },
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Hindi',
          teacher: 'Hima Das',
          teacherId: 'hm23'
        },
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        null,
        null
      ]
    ],
    [
      'Friday',
      [
        {
          subject: 'Maths',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'English',
          teacher: 'Suresh Deshpandey Choudhary',
          teacherId: 'sd121'
        },
        {
          subject: 'Hindi',
          teacher: 'Hima Das',
          teacherId: 'hm23'
        },
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        {
          subject: 'Geography',
          teacher: 'Mahesh Kumar',
          teacherId: 'mh23'
        },
        null,
        {
          subject: 'Science',
          teacher: 'Zakira',
          teacherId: 'zk21'
        }
      ]
    ]
  ]
}

function trimName(name = '') {
  if (name.length > 16) {
    return `${name.substr(0, 14)}..`
  }
  return name
}

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

function RoutineTable(props) {
  const { classes, data } = props
  const { className, routine, section } = data
  const maxPeriods = routine
    .map(it => it[1].length)
    .reduce((a, b) => Math.max(a, b), 0)
  const periodsArray = Array(maxPeriods)
    .fill(1)
    .map((a, i) => a + i)

  return (
    <div className={classes.root}>
      <Typography variant="subheading">
        Routine for class {className}-{section}
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
                        {subject.subject}
                      </div>
                      <div className={classes.teacherName}>
                        ({trimName(subject.teacher)})
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

RoutineTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(RoutineTable)
