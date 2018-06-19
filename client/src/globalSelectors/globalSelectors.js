import { createSelector } from 'reselect'

import {
  getLocalState as productsState,
  getProducts,
} from '../pages/home/selectors/home.selectors'

import {
  getCartItems,
  getLocalState as cartState,
} from '../container/cart/selectors/cart.selectors'


export const getOrderItems = createSelector(
  [productsState, cartState], // get states
  (prState, crtState) => [getProducts(prState), getCartItems(crtState)],
  (products, cartItems) => {
    return products.items.filter(product => {
      return cartItems.items.some(cartItem => product._id === cartItem.productId) // eslint-disable-line
    })
      // I mix products with cart array and return the array:
      // + 'quantity' field
      // swap productId with _id values
      .map((item, idx) => {
        return {
          ...item,
          _id: cartItems.items[idx]._id,
          productId: item._id,
          quantity: cartItems.items[idx].quantity,
        }
      })
  },
)
