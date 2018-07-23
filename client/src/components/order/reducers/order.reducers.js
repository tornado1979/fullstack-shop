import {
  REQUEST_ORDERS,
  RECEIVE_ORDERS,
  RECEIVE_ORDERS_SUCCESS,
  RECEIVE_ORDERS_FAIL,
  SUBMIT_ORDER,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAIL,
} from '../actions/order.actions'

const initialState = {
  error: '',
  isFetching: false,
  orders: [],
}
export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ORDERS:
    case RECEIVE_ORDERS:
    case RECEIVE_ORDERS_SUCCESS:
    case RECEIVE_ORDERS_FAIL:
    case SUBMIT_ORDER:
      return {
        ...state,
        isFetching: false,
        message: action.payload.orderData.message,
        orders: [...state.orders, action.payload.orderData.order],
        success: action.payload.orderData.success,
      }
    case SUBMIT_ORDER_SUCCESS:
      return state
    case SUBMIT_ORDER_FAIL:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
        success: false,
      }
    default:
      return state
  }
}
