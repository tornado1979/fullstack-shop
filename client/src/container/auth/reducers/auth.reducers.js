import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SIGNUP_START,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from '../actions/auth.actions'

const initialState = {
  loading: false,
  message: '',
  user: {},
}

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        loading: true,
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        user: Object.assign({}, { email: action.payload.email, token: action.payload.token }),
      }
    case AUTH_START:
      return {
        ...state,
        loading: true,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        user: Object.assign({}, { email: action.payload.email, token: action.payload.token }),
      }
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    default:
      return state
  }
}
