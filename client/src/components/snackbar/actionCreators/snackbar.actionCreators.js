import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from '../actions/snackbar.actions'

export const showSnackBar = ({ open, message }) => {
  return {
    payload: {
      message,
      open,
    },
    type: SHOW_SNACKBAR,
  }
}

export const hideSnackBar = ({ open, message }) => {
  return {
    payload: {
      message,
      open,
    },
    type: HIDE_SNACKBAR,
  }
}
