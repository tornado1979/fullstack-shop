import fetch from 'cross-fetch'

import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
} from '../actions/auth.actions'

const authRequest = () => {
  return {
    type: AUTH_START,
  }
}

const authSuccess = (authData) => {
  return {
    payload: authData,
    type: AUTH_SUCCESS,
  }
}

const authFail = (error) => {
  console.log('auth failed', error)
  return {
    payload: error,
    type: AUTH_FAIL,
  }
}


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
      dispatch(authSuccess(result))
      // call the callback function to redirect the user to '/'
      callback()
    } catch (error) {
      console.log('error user login', error)
      dispatch(authFail(error))
    }
  }
}
