import { createSelector } from 'reselect'

const getLocalState = (state) => state.snackbar

export const isSnackBarOpen = createSelector(
  getLocalState,
  snackbar => {
    return (snackbar && snackbar.open)
  },
)

export const getMessage = createSelector(
  getLocalState,
  snackbar => {
    return (snackbar && snackbar.message)
  },
)

export const getVariant = createSelector(
  getLocalState,
  snackbar => {
    return (snackbar && snackbar.variant)
  },
)
