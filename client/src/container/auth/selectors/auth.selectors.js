import { createSelector } from 'reselect'

const getLocalState = (state) => {
  return state.user
}

export const getUser = createSelector(
  getLocalState,
  user => user.user || {},
)

export const isUserLogedIn = createSelector(
  getUser,
  user => (user && !!user.token) || false,
)

export const getMessage = createSelector(
  getLocalState,
  user => user.message,
)
