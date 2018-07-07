import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from '../actions/snackbar.actions'

export const showSnackBar = ({ message, open, variant }) => {
  return {
    payload: {
      message,
      open,
      variant,
    },
    type: SHOW_SNACKBAR,
  }
}

export const hideSnackBar = ({ open, message, variant }) => {
  return {
    payload: {
      message,
      open,
      variant,
    },
    type: HIDE_SNACKBAR,
  }
}
