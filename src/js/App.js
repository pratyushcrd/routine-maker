import React from 'react'
import { Provider } from 'react-redux'
import { initialize } from './actions/session'
import store from './store'
import Main from './components/Main'

if (window.location.pathname !== '/login') {
  store.dispatch(initialize(window.location.pathname))
}

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
)
