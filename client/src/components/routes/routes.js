import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../pages/home/home'
import Checkout from '../../pages/checkout/checkout'
import Login from '../../pages/login/login'
import SignOut from '../../container/auth/signOut'
import PrivateRoute from '../privateRoute/index'
import SignUp from '../../pages/signup/signup'

export const Routes = () => {
  return (
    <Switch>
      <Route
        component={Home}
        exact
        path="/"
      />
      <PrivateRoute
        component={Checkout}
        path="/checkout"
      />
      <Route
        component={Login}
        exact
        path="/login"
      />
      <Route
        component={SignUp}
        exact
        path="/signup"
      />
      <Route
        component={SignOut}
        exact
        path="/signout"
      />
    </Switch>
  )
}
