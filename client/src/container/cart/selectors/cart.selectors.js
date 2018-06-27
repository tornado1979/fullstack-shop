import { createSelector } from 'reselect'

export const getLocalState = (state) => state && state.cart

export const getCartItems = createSelector(
  getLocalState,
  cart => {
    return (cart && cart.items) || []
  },
)

export const isItemOnCart = (productId) => createSelector(
  (getCartItems),
  (cartItems) => {
    return cartItems.some(item => item.productId === productId)
  },
)
