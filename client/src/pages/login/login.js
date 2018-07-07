import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import AuthForm from '../../container/auth'

import { auth } from '../../container/auth/actionCreators/auth.actionCreators'
import { getUser } from '../../container/auth/selectors/auth.selectors'

// import config from '../../../clientConfig'
// const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class Login extends Component {
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

  goto() {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <main>
        <AuthForm
          goto={() => this.goto()}
          onSubmit={(values) => this.handleSubmited(values)}
        />
      </main>
    )
  }
}

Login.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
