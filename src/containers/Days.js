import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
})

function CSSGrid(props) {
  const { classes } = props

  return (
    <div>
      <Typography variant="caption" align="center" gutterBottom>
        Enter Working School Days
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Periods</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Monday</TableCell>
                  <TableCell>8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tuesday</TableCell>
                  <TableCell>8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wednesday</TableCell>
                  <TableCell>8</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

CSSGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CSSGrid)
