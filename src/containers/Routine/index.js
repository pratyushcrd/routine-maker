import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import ClassRoutine from './ClassRoutine'
import TeacherView from './TeacherView'
import SectionView from './SectionView'
import CommonAreaView from './CommonAreaView'

const styles = theme => ({
})

class Routine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      selected: '',
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
        console.log(response)
        this.setState({
          data: response,
          selected: 'sections',
        })
      })
      .catch((error) => {
        this.setState({
          data: null,
          selected: 'error',
        })
      })
  }

  select(selection) {
    return () => {
      this.setState({
        selected: selection
      })
    }
  }

  render() {
    const { classes } = this.props
    const { data, selected } = this.state
    return (
      <div>
        <Button onClick={this.select('sections')} variant="text">Sections View</Button>
        <Button onClick={this.select('teachers')} variant="text">Teachers View</Button>
        <Button onClick={this.select('commonArea')} variant="text">Common Area View</Button>
        {
          data ?
            <div>
              {
                selected === 'sections' &&
                <ClassRoutine
                  data={this.state.data.sectionsRoutine}
                  ViewComponent={SectionView}
                />
              }
              {
                selected === 'teachers' &&
                <ClassRoutine
                  data={this.state.data.teachersRoutine}
                  ViewComponent={TeacherView}
                />
              }
              {
                selected === 'commonArea' &&
                <ClassRoutine
                  data={this.state.data.commonAreasRoutine}
                  ViewComponent={CommonAreaView}
                />
              }
            </div>
            :
            <div> Loading </div>
        }
      </div>
    )
  }
}

Routine.propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

export default withStyles(styles)(Routine)
