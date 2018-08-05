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


class Chips extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getList() {
    const classes = this.props.classList
      .map(({ className }) => className)
    return classes
  }

  handleClick = (index) => {
    const handler = this.props.changeScreen
    return function () {
      handler(index)
    }
  }

  render() {
    const classesList = this.getList()
      .map(name => ({ name, avatar: 'Cl' }))
    const school = { name: 'School', avatar: 'S' }
    const details = [school, ...classesList]
    const classes = this.props.classes

    return (
      <Grid container spacing={24} >
        <Grid item xs={12} >
          <Typography variant="subheading" gutterBottom>
            Select an item to edit:
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.root}>
            {details.map((detail, index) => (
              <Chip
                key={`@@homechips#${detail.name}`}
                label={detail.name}
                onClick={this.handleClick(index)}
                color="primary"
                avatar={<Avatar>{detail.avatar}</Avatar>}
                className={classes.chip}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Chips.propTypes = {
  classList: PropTypes.arrayOf(
    PropTypes.shape({ className: PropTypes.string.isRequired })
  ).isRequired,
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired
  }).isRequired,
  changeScreen: PropTypes.func.isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Chips))
