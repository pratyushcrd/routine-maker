import React from 'react'
import { render, } from 'react-dom'
import { Provider, } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'

import store from './store'
import Base from './Base'

render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <Base />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
)
