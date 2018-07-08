import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  RECEIVE_CART_FAIL,
} from '../container/cart/actions/cart.action'

import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from '../container/auth/actions/auth.actions'
import { showSnackBar } from '../components/snackbar/actionCreators/snackbar.actionCreators'

// RECEIVE_PRODUCTS_SUCCESS
export const handleSnackBar = (store) => {
  return next => action => {
    const payload = Object.assign({}, action.payload)

    switch (action.type) {
      case AUTH_SUCCESS:
      case SIGNUP_SUCCESS:
        store.dispatch(showSnackBar({ message: payload.message, open: true, variant: 'success' }))
        return next(action)
      case AUTH_FAIL:
      case SIGNUP_FAIL:
        store.dispatch(showSnackBar({ message: payload.message, open: true, variant: 'error' }))
        return next(action)
      case ADD_ITEM_TO_CART:
        store.dispatch(showSnackBar({ message: 'Product added into cart', open: true, variant: 'success' }))
        return next(action)
      case REMOVE_ITEM_FROM_CART:
        store.dispatch(showSnackBar({ message: 'Product removed from cart', open: true, variant: 'success' }))
        return next(action)
      case RECEIVE_CART_FAIL:
        store.dispatch(showSnackBar({ message: payload.message, open: true, variant: 'warning' }))
        return next(action)
      default:
        return next(action)
    }
  }
}
