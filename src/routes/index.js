import React from 'react'
import { Route } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import LoginView from 'views/LoginView/LoginView'
import AppView from 'views/AppView/AppView'
import LobbyView from 'views/LobbyView/LobbyView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <Route path='login' component={LoginView} />
    <Route path='game' component={AppView} />
    <Route path='lobby' component={LobbyView} />
  </Route>
)
