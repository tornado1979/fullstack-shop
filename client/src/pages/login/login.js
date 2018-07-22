import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import AuthForm from '../../container/auth'

import { auth } from '../../container/auth/actionCreators/auth.actionCreators'
import { isUserLogedIn } from '../../container/auth/selectors/auth.selectors'

// import config from '../../../clientConfig'
// const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class Login extends Component {
  componentDidMount() {
    const {
      history,
      isUserLoggedIn,
    } = this.props

    if (isUserLoggedIn) {
      history.push('/checkout')
    }
  }

  handleSubmited(values) {
    const {
      history,
      login,
    } = this.props

    // dispatch AUTH_START
    login(values, () => {
      history.push('/')
    })
  }

  goto() {
    const {
      history,
    } = this.props

    history.push('/signup')
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
  return ({
    isUserLoggedIn: isUserLogedIn(state),
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: (credentials, redirection) => auth(credentials, redirection),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
