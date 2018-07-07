import { createSelector } from 'reselect'

const getLocalState = (state) => {
  return state.user
}

export const getUser = createSelector(
  getLocalState,
  user => (user.user && user.user.token) || {},
)

export const getMessage = createSelector(
  getLocalState,
  user => user.message,
)
