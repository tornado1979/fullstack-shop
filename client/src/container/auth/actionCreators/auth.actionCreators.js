import fetch from 'cross-fetch'

import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from '../actions/auth.actions'

const authRequest = () => {
  return {
    type: AUTH_START,
  }
}

const signupRequest = () => {
  return {
    type: SIGNUP_START,
  }
}
const signupSuccess = (values) => {
  return {
    payload: values,
    type: SIGNUP_SUCCESS,
  }
}

const signupFail = (error) => {
  return {
    payload: error,
    type: SIGNUP_FAIL,
  }
}

export const signup = (formValues, callback) => async (dispatch) => {
  // dispatch sign up request
  dispatch(signupRequest())

  try {
    // response = await fetch(`${server}users/signup`)
    const response = await fetch('users/signup',
      {
        body: JSON.stringify(formValues),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

    const result = await response.json()
    // store user data & token on localStorage
    localStorage.setItem('user', JSON.stringify(result))
    dispatch(signupSuccess(result))
    // call the callback function to redirect the user to '/'
    callback()
  } catch (error) {
    dispatch(signupFail(error))
  }

  // make the http request with fetch
  // dispatch success and fail
}

const authSuccess = (authData) => {
  return {
    payload: authData,
    type: AUTH_SUCCESS,
  }
}

const authFail = (error) => {
  return {
    payload: error,
    type: AUTH_FAIL,
  }
}

export const signOut = (callBack) => {
  // remove  user from localStorage
  localStorage.removeItem('user')
  // redirect user
  callBack()

  // dispatch logout
  return {
    payload: {
      message: 'Goodbye, we will miss you mate!',
      success: true,
    },
    type: AUTH_SUCCESS,
  }
}


// login and call callback to save token on localStorage
export const auth = (data, callback) => {
  return async dispatch => {
    dispatch(authRequest())

    try {
      // response = await fetch(`${server}users/signin`)
      const response = await fetch('users/signin',
        {
          body: JSON.stringify(data),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

      const result = await response.json()
      // store user data & token on localStorage
      localStorage.setItem('user', JSON.stringify(result))
      dispatch(authSuccess(result))
      // call the callback function to redirect the user to '/'
      callback()
    } catch (error) {
      dispatch(authFail('Invalid login credentials.'))
    }
  }
}

export const authoriation = (data, callback) => {
  return async dispatch => {
    dispatch(authRequest())

    try {
      // response = await fetch(`${server}users/signin`)
      const response = await fetch('users/signin',
        {
          body: JSON.stringify(data),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

      const result = await response.json()
      // store user data & token on localStorage
      localStorage.setItem('user', JSON.stringify(result))
      dispatch(authSuccess(result))
      // call the callback function to redirect the user to '/'
      callback()
    } catch (error) {
      dispatch(authFail('Invalid login credentials.'))
    }
  }
}
