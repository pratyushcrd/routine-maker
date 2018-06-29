import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { loadApp, } from 'actions/app'
import PropTypes from 'prop-types'
import styles from './app.css'
import pages from '../constants/app-pages'

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadApp())
  }

  render() {
    const DisplayedPage = pages.pages[this.props.currentScreen]
    if (!this.props.loaded) {
      return null
    }

    return (
      <div className={styles.container} >
        <DisplayedPage />
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
  currentScreen: PropTypes.number.isRequired,
}

export default connect(mapStateToProperties)(AppContainer)
