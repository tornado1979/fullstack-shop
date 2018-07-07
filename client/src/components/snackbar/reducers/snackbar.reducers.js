import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from '../actions/snackbar.actions'

const initState = {
  message: '',
  open: false,
  variant: '',
}
export const reducers = (state = initState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
    case HIDE_SNACKBAR:
      return {
        ...state,
        message: action.payload.message,
        open: action.payload.open,
        variant: action.payload.variant,
      }
    default:
      return state
  }
}
