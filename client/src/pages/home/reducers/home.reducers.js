import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  RECEIVE_PRODUCTS_SUCCESS,
  RECEIVE_PRODUCTS_FAIL,
} from '../actions/home.actions'

const initialState = {

}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        products: action.payload.products,
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case RECEIVE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    case RECEIVE_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
