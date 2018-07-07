import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import SignUpForm from '../../container/auth/signupForm'

import { signup } from '../../container/auth/actionCreators/auth.actionCreators'
import {
  getUser,
  getMessage,
} from '../../container/auth/selectors/auth.selectors'

// import config from '../../../clientConfig'
// const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class SignUp extends Component {
  componentDidMount() {
    if (this.props.isUserLoggedIn) {
      this.props.history.push('/checkout')
    }
  }

  handleSubmited(formValues) {
    // dispatch AUTH_START
    // add callback function to redirect user after sign up ?? (dont know yet, where to redirect)
    this.props.signup(formValues, () => {
      console.log('redirect user after sign up')
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
            onSubmit={(values) => this.handleSubmited(values)} // eslint-disable-line
            serverMessage={this.props.serverMessage}
          />
        </div>
      </main>
    )
  }
}

SignUp.propTypes = {
  history: propTypes.shape().isRequired,
  isUserLoggedIn: propTypes.bool.isRequired,
  signup: propTypes.func.isRequired,
  serverMessage: propTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  const user = getUser(state)
  return ({
    isUserLoggedIn: !!Object.keys(user).length,
    serverMessage: getMessage(state),
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signup: (formValues, redirection) => signup(formValues, redirection),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
