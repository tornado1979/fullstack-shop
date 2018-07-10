import fetch from 'cross-fetch'

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
  CART_ACTION_FAIL,
  REQUEST_CART,
  RECEIVE_CART,
  RECEIVE_CART_SUCCESS,
  RECEIVE_CART_FAIL,
} from '../actions/cart.action'

import config from '../../../clientConfig'

const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

export const requestCart = () => {
  return {
    payload: {
      isFetching: true,
      products: [],
    },
    type: REQUEST_CART,
  }
}

export const receiveCart = (payload) => {
  return {
    payload,
    type: RECEIVE_CART,
  }
}

export const receiveCartSuccess = () => {
  return {
    payload: {
      isFetching: false,
    },
    type: RECEIVE_CART_SUCCESS,
  }
}

export const receiveCartFail = (err) => {
  return {
    payload: { message: err },
    type: RECEIVE_CART_FAIL,
  }
}

export const fetchCart = (JwtToken) => async (dispatch) => {
  dispatch(requestCart())
  try {
    const response = await fetch(`${server}cart`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'GET',
      },
    )
    /* const response = await fetch('cart',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'GET',
      },
    ) */

    // get status
    // if status is not 200,304
    // i dispatch cartfail
    const statuses = [200, 304]
    if (statuses.includes(response.status)) {
      const result = await response.json()
      console.log('cart items', result)
      dispatch(receiveCart(result))
      dispatch(receiveCartSuccess())
    } else {
      dispatch(receiveCartFail(response.statusText))
    }
  } catch (err) {
    dispatch(receiveCartFail(err.message))
  }
}


export const cartActionFail = (err) => {
  return {
    payload: err,
    type: CART_ACTION_FAIL,
  }
}

export const addItemToCart = (payload, JwtToken) => async (dispatch) => {
  try {
    // const response = await fetch(`${server}cart/add`,
    const response = await fetch(`${server}cart/add`,
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'POST',
      })
    /*
    const response = await fetch('cart/add',
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'POST',
      })
*/
    const result = await response.json()

    // dispatch add item to cart
    dispatch({
      payload: result,
      type: ADD_ITEM_TO_CART,
    })
  } catch (err) {
    dispatch(cartActionFail(err))
  }

  return {
    payload,
    type: ADD_ITEM_TO_CART,
  }
}

export const updateCartItem = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`${server}cart/update`,
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    /*
    const response = await fetch('cart/update',
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
*/
    const result = await response.json()

    dispatch({
      payload: result,
      type: UPDATE_CART_ITEM,
    })
  } catch (err) {
    dispatch(cartActionFail(err))
  }
}

export const removeItemFromCart = (payload, JwtToken) => async (dispatch) => {
  try {
    const response = await fetch(`${server}cart/remove`,
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'POST',
      })
    /*
    const response = await fetch('cart/remove',
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'POST',
      })
*/
    const result = await response.json()
    console.log('remove item result', result)
    dispatch({
      payload,
      type: REMOVE_ITEM_FROM_CART,
    })
  } catch (err) {
    dispatch(cartActionFail(err))
  }
}
