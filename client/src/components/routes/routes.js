import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../pages/home/home'
import Checkout from '../../pages/checkout/checkout'

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
    </Switch>
  )
}
