import fetch from 'cross-fetch'

import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  RECEIVE_PRODUCTS_SUCCESS,
  RECEIVE_PRODUCTS_FAIL,
} from '../actions/home.actions'

// import config from '../../../clientConfig'
// const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

export const requestProducts = () => {
  return {
    payload: {
      isFetching: true,
      products: [],
    },
    type: REQUEST_PRODUCTS,
  }
}

export const receiveProducts = (payload) => {
  return {
    payload,
    type: RECEIVE_PRODUCTS,
  }
}

export const receiveProductsSuccess = () => {
  return {
    payload: {
      isFetching: false,
    },
    type: RECEIVE_PRODUCTS_SUCCESS,
  }
}

export const receiveProductsFail = (err) => {
  return {
    payload: err,
    type: RECEIVE_PRODUCTS_FAIL,
  }
}

export const fetchProducts = () => async (dispatch) => {
  dispatch(requestProducts())

  let response
  let result

  try {
    // response = await fetch(`${server}products`)
    response = await fetch('products')
    result = await response.json()
    await dispatch(receiveProducts(result))
    await dispatch(receiveProductsSuccess())
  } catch (err) {
    dispatch(receiveProductsFail(err.message))
  }
}
