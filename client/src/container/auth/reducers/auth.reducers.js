import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SIGNUP_START,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGN_OUT,
} from '../actions/auth.actions'

const initialState = {
  loading: false,
  message: '',
  user: {
    email: null,
    token: null,
  },
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
        user: Object.assign({}, { ...action.payload.user }),
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
        user: Object.assign({}, { ...action.payload.user }),
      }
    case SIGN_OUT:
      return {
        ...state,
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
