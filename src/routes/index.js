import React from 'react'
import { Route } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import AppView from 'views/AppView/AppView'

export default (store) => (
  <Route component={CoreLayout}>
    <Route path='/(?page=:page)' component={AppView} />
  </Route>
)
