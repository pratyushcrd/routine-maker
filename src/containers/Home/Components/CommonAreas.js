import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4,
  },
  leftIcon: {
    marginRight: theme.spacing.unit * 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 1,
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
  },
  iconSmall: {
    fontSize: 20,
  },
})

/**
 * Component to render Section CommonAreas
 */
class CommonAreas extends React.Component {
  render() {
    const classes = this.props.classes
    const commonAreas = this.props.commonAreas
    const addCommonArea = this.props.addCommonArea

    return (
      <div>
        <Typography>
          Details
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Common Area</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commonAreas.map(commonArea => (
              <TableRow key={`commonAreas@@${commonArea.name}`}>
                <TableCell scope="row">
                  {commonArea.name}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Decrease"
                    // onClick={}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!commonAreas.length && (
              <TableRow>
                <TableCell scope="row">
                  No Common Area Added
                </TableCell>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Grid container>
          <Grid item xs={8}>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              // value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button color="primary" size="small" className={classes.button}>
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

CommonAreas.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(CommonAreas)
