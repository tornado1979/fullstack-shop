import { createSelector } from 'reselect'

export const getLocalState = (state) => state.products

export const getProducts = createSelector(
  getLocalState,
  products => (products && products.items) || [],
)
