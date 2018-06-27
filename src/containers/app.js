import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { loadApp, } from 'actions/app'
import styles from './app.css'
import Days from './Days/index'

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadApp())
  }

  props: Props;

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

export default connect(mapStateToProperties)(AppContainer)
