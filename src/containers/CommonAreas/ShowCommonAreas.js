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

const dummyCommonArea = {
  name: 'No common area added',
}

function getTableEntries(commonArea, index) {
  return (<TableRow key={index + 1}>
    <TableCell>{(index + 1) || 'NA'}</TableCell>
    <TableCell>{commonArea.name}</TableCell>
  </TableRow>)
}

function ShowCommonAreas(props) {
  const { classes, commonAreas = {} } = props
  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Common Area</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { commonAreas.map(getTableEntries) }
          { !commonAreas.length && getTableEntries(dummyCommonArea, -1) }
        </TableBody>
      </Table>
    </Paper>
  )
}

ShowCommonAreas.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  commonAreas: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function mapStateToProperties(state) {
  return state.input
}

export default connect(mapStateToProperties)(withStyles(styles)(ShowCommonAreas))
