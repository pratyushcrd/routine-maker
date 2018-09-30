import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import ShowRoutine from './ShowRoutine'

const styles = theme => ({
})

class Routine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    fetch('/api/v1/routine/make', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        input: window.localStorage.inputState
      }),
    })
      .then(response => response.json())
      .then((response) => {
        console.log(response.sectionsRoutine)
        this.setState({
          data: response.sectionsRoutine
        })
      })
      .catch((error) => {
        this.setState({
          data: null,
          error: String(error),
        })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        {
          this.state.data ?
            <ShowRoutine data={this.state.data} />
            :
            <div> Error </div>
        }
      </div>
    )
  }
}

Routine.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Routine)
