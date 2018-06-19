import { createSelector } from 'reselect'

export const getLocalState = (state) => state && state.cart

export const getCartItems = createSelector(
  getLocalState,
  cart => {
    // console.log('cart items', cart)
    return (cart && cart.items) || []
  },
)

export const isItemOnCart = (productId) => createSelector(
  (getCartItems),
  (cartItems) => {
    console.log('productId into selector', cartItems, productId)
    return cartItems.some(item => item.productId === productId)
  },
)
