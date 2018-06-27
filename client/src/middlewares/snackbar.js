import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from '../container/cart/actions/cart.action'

import {
  showSnackBar,
  hideSnackBar,
} from '../components/snackbar/actionCreators/snackbar.actionCreators'

// RECEIVE_PRODUCTS_SUCCESS
export const handleSnackBar = (store) => {
  return next => action => {
    switch (action.type) {
      case ADD_ITEM_TO_CART:
        store.dispatch(showSnackBar({ message: 'Product added into cart', open: true }))
        return next(action)
      case REMOVE_ITEM_FROM_CART:
        store.dispatch(hideSnackBar({ message: 'Product removed from cart', open: true }))
        return next(action)
      default:
        return next(action)
    }
  }
}
