import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { loadApp, } from 'actions/app'
import PropTypes from 'prop-types'
import styles from './app.css'
import Days from './Days/index'
import Classes from './Classes/index'
import Teachers from './Teachers/index'

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadApp())
  }

  render() {
    let displayedPage = <Classes />;
    if(this.props.currentScreen == 2){
      displayedPage = <Days />;
    }
    else if(this.props.currentScreen == 0){
      displayedPage = <Teachers />;
    }
    if (!this.props.loaded) {
      return null
    }

    return (
      <div className={styles.container} >
        {displayedPage}
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
