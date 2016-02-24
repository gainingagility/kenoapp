import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import LoginView from 'views/LoginView/LoginView'
import AppView from 'views/AppView/AppView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={LoginView} />
    <Route path='app' component={AppView} />
  </Route>
)
