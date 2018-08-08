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
    const firstClass = this.props.classList[0]
    this.state = {
      selectedClass: firstClass && firstClass.className
    }
  }

  /**
   * Get classes list in format: [{ name: '1' }]
   */
  getClassList = () => {
    const classes = this.props.classList
      .map(({ className }) => ({ name: className }))
      .sort((a, b) => (a > b ? -1 : 1))
    return classes
  }

  selectClass = (obj) => {
    this.setState({
      selectedClass: obj.name
    })
  }

  render() {
    const classes = this.props.classes
    const selectClass = this.selectClass

    return (
      <Grid container spacing={24} >
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12} >
              <ChipsList selectClass={selectClass} classesList={this.getClassList()} />
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
  }).isRequired,
  classList: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
  })).isRequired
}


function mapStateToProperties(state) {
  return Object.assign({}, state.input)
}

export default connect(mapStateToProperties)(withStyles(styles)(Home))
