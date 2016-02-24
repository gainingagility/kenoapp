import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import LoginView from 'views/LoginView/LoginView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={LoginView} />
  </Route>
)
