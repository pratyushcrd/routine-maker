import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex-root',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    margin: theme.spacing.unit,
    marginTop: 0
  },
  chip: {
    margin: theme.spacing.unit,
    // border: 'solid 1px #0000004d',
    // backgroundColor: theme.palette.secondary.main
  },
})

/**
 * Component to render Classes & School's Chips
 */
function Chips(props) {
  const classesList = props.classesList
  const classes = props.classes
  const onSelect = detail => () => props.selectClass(detail)

  return (
    <Grid container spacing={24} >
      <Grid item xs={12} >
        <Typography variant="subheading" gutterBottom>
            Select an item to edit:
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.root}>
          {classesList.map(detail => (
            <Chip
              key={`@@homechips#${detail.name}`}
              label={detail.name}
              onClick={onSelect(detail)}
              color="primary"
              avatar={<Avatar>CL</Avatar>}
              className={classes.chip}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  )
}

Chips.propTypes = {
  classesList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired
  }).isRequired,
  selectClass: PropTypes.func.isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Chips))
