import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from '../actions/auth.actions'

const initialState = {
  errorMessage: '',
  loading: false,
  user: {},
}

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case AUTH_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
