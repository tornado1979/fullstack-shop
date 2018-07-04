import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { getUser } from '../container/auth/selectors/auth.selectors'

export default ChildComponent => {
  class ComposedComponent extends Component { // eslint-disable-line

    componentDidMount() {
      this.shouldNavigateAway()
    }

    componentDidUpdate() {
      this.shouldNavigateAway()
    }

    shouldNavigateAway() {
      if (!this.props.isUserLoggedIn) {
        this.props.history.push('/')
      }
    }

    render() {
      return (
        <ChildComponent
          {...this.props}
        />
      )
    }
  }

  ComposedComponent.propTypes = {
    history: propTypes.shape().isRequired,
    isUserLoggedIn: propTypes.bool.isRequired,
    login: propTypes.func.isRequired,
  }

  const mapStateToProps = (state) => {
    const user = getUser(state)
    return ({
      isUserLoggedIn: !!Object.keys(user).length,
    })
  }

  return connect(mapStateToProps, null)(ComposedComponent)
}
