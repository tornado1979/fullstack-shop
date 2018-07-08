import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
  REQUEST_CART,
  RECEIVE_CART,
  RECEIVE_CART_FAIL,
} from '../actions/cart.action'

const initialState = {
  items: [],
  message: '',
  success: true,
}

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CART:
      return state
    case RECEIVE_CART:
      return {
        ...state,
        ...state.items,
        items: action.payload,
        message: action.payload.message,
        success: true,
      }
    case RECEIVE_CART_FAIL:
      return {
        ...state,
        message: action.payload.message,
        success: false,
      }
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case UPDATE_CART_ITEM: {
      const { quantity } = action.payload
      const updatedItems = state.items
        .map(item => (item._id === action.payload._id ? { ...item, quantity } : item))
      return {
        ...state,
        items: updatedItems,
      }
    }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload.cartId),
      }
    default:
      return state
  }
}
