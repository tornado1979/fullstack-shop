// import fetch from 'cross-fetch'

import {
  REQUEST_ORDERS,
  RECEIVE_ORDERS,
  RECEIVE_ORDERS_SUCCESS,
  RECEIVE_ORDERS_FAIL,
  SUBMIT_ORDER,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAIL,
} from '../actions/order.actions'

// SEND ORDER //
export const submitOrder = (orderData) => {
  return {
    payload: {
      order: orderData,
      isFetching: true,
    },
    type: SUBMIT_ORDER,
  }
}
export const submitOrderSuccess = () => {
  return {
    payload: {
      isFetching: false,
    },
    type: SUBMIT_ORDER_SUCCESS,
  }
}

export const submitOrderFail = (err) => {
  return {
    payload: err,
    type: SUBMIT_ORDER_FAIL,
  }
}

export const sendOrder = (data, JwtToken) => {
  return async dispatch => {
    // const response = await fetch(`${server}orders`,
    const response = await fetch('orders',
      {
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: JwtToken,
        },
        method: 'POST',
      },
    )
      .catch(err => {
        dispatch(submitOrderFail(err))
      })


    // get status
    // if status is not 200,304
    // i dispatch orderfail
    const statuses = [200, 304]
    if (statuses.includes(response.status)) {
      const res = await response.json()
      dispatch(submitOrder(res))
      dispatch(submitOrderSuccess())
    } else {
      dispatch(submitOrderFail(response.statusText))
    }
  }
}

export const requestOrders = () => {
  return {
    payload: {
      isFetching: false,
      orders: [],
    },
    type: REQUEST_ORDERS,
  }
}


// RECEIVE ORDERS //
export const receiveOrders = (payload) => {
  return {
    payload,
    type: RECEIVE_ORDERS,
  }
}

export const receiveOrdersSuccess = () => {
  return (
    {
      payload: {
        isFetching: false,
      },
      type: RECEIVE_ORDERS_SUCCESS,
    }
  )
}

export const receiveOrdersFail = (er) => {
  return (
    {
      payload: er,
      type: RECEIVE_ORDERS_FAIL,
    }
  )
}
