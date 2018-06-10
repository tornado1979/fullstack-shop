import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../pages/home/home'

export const Routes = () => {
  return (
    <Switch>
      <Route
        component={Home}
        exact
        path="/"
      />
    </Switch>
  )
}
