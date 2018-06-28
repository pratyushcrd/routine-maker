import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { loadApp, } from 'actions/app'
import PropTypes from 'prop-types'
import styles from './app.css'
import Days from './Days/index'


export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadApp())
  }

  render() {
    if (!this.props.loaded) {
      return null
    }

    return (
      <div className={styles.container} >
        <Days />
      </div>
    )
  }
}

function mapStateToProperties(state) {
  return Object.assign({}, state.app)
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
}

export default connect(mapStateToProperties)(AppContainer)
