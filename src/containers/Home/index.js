import React from 'react'
import { connect, } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import ChipsList from './ChipsList'

const styles = theme => ({
  details: {
    marginTop: `${theme.spacing.unit * 4}px`,
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: -1
    }
  }

  changeScreen = (index) => {
    this.setState({
      screen: index - 1
    })
  }

  render() {
    const classes = this.props.classes
    const changeScreen = this.changeScreen

    return (
      <Grid container spacing={24} >
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12} >
              <ChipsList changeScreen={changeScreen} />
            </Grid>
            <Grid item xs={12} className={classes.details} >
              Details
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} >
          Teachers Panel
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    details: PropTypes.string.isRequired
  }).isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
