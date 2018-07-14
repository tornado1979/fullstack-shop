import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import {
  Route,
  Redirect,
} from 'react-router-dom'

import { isUserLogedIn } from '../../container/auth/selectors/auth.selectors'

// get token from state
class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component,  //eslint-disable-line
      isUserLoggedIn,
      ...rest
    } = this.props
    if (isUserLoggedIn) {
      return (
        <Route
          {...rest}
          render={(props) => (
            <Component {...props} />
          )}
        />
      )
    }
    return <Redirect to="/" />
  }
}

PrivateRoute.propTypes = {
  isUserLoggedIn: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: isUserLogedIn(state),
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
