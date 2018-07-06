import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import SignUpForm from '../../container/auth/signupForm'

import { auth } from '../../container/auth/actionCreators/auth.actionCreators'
import { getUser } from '../../container/auth/selectors/auth.selectors'

// import config from '../../../clientConfig'
// const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class SignUp extends Component {
  componentDidMount() {
    if (this.props.isUserLoggedIn) {
      this.props.history.push('/checkout')
    }
  }

  handleSubmited(values) {
    // dispatch AUTH_START
    this.props.login(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <main>
        <div className="billing-details">
          <div className="title">
            <h2>Sign up</h2>
          </div>
          <SignUpForm
            onSubmit={this.handleSubmit}
          />
        </div>
      </main>
    )
  }
}

SignUp.propTypes = {
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: (credentials, redirection) => auth(credentials, redirection),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
