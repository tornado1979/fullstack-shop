import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import { isUserLogedIn } from '../auth/selectors/auth.selectors'
import { signOut } from '../auth/actionCreators/auth.actionCreators'

class SignOut extends Component { // eslint-disable-line
  componentDidMount() {
    // logout user and redirect them on  root
    this.props.logOut(() => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div> good bye dear clientmy friend, come back soon! </div>
    )
  }
}

SignOut.propTypes = {
  history: propTypes.shape().isRequired,
  isUserLoggedIn: propTypes.bool.isRequired,
  logOut: propTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return ({
    isUserLoggedIn: isUserLogedIn(state),
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logOut: (redirection) => signOut(redirection),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)
