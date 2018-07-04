import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../pages/home/home'
import Checkout from '../../pages/checkout/checkout'
import Login from '../../pages/login/login'
import SignOut from '../../container/auth/signOut'

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
        exact
        path="/login"
      />
      <Route
        component={SignOut}
        exact
        path="/signout"
      />
    </Switch>
  )
}
