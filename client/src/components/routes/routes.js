import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../pages/home/home'
import Checkout from '../../pages/checkout/checkout'
import Login from '../../pages/login/login'

export const Routes = () => {
  return (
    <Switch>
      <Route
        component={Home}
        exact
        path="/"
      />
      <Route
        component={Checkout}
        path="/checkout"
      />
      <Route
        component={Login}
        path="/login"
      />
    </Switch>
  )
}
