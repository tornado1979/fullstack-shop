import { createSelector } from 'reselect'

const getLocalState = (state) => {
  console.log('user localstate', state.user)
  return state.user
}

export const getUser = createSelector(
  getLocalState,
  user => (user.user && user.user.token) || {},
)
