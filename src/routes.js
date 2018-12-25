import React from 'react'
import { Switch, Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { history } from 'store/index'
import Home from 'containers/Home'
import Routine from 'containers/Routine'

const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/routine" component={Routine} />
    </Switch>
  </ConnectedRouter>
)

export default routes
