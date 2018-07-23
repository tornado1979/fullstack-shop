import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import ClientDetailsForm from '../../container/auth/signupForm'
import Order from '../../components/order'
import { sendOrder } from '../../components/order/actionCreators/order.actionCreators'
import { getCartItems } from '../../container/cart/selectors/cart.selectors'
import { getUser } from '../../container/auth/selectors/auth.selectors'

import './checkout.scss'

class Checkout extends Component {
  handleSubmit = (values => {
    console.log('form submit...', values)
  })

  submitOrder = () => {
    const {
      JwtToken,
      cartItems,
    } = this.props

    // TODO: check the integrity of the cartItems data
    this.props.sendOrder(cartItems, JwtToken)
  }

  render() {
    return (
      <main>
        <div className="billing-details">
          <div className="title">
            <h2>Checkout</h2>
          </div>
          <ClientDetailsForm />
          <Order
            handleSubmit={(ev) => this.submitOrder(ev)}
          />
        </div>
      </main>
    )
  }
}

Checkout.propTypes = {
  JwtToken: propTypes.string,
  cartItems: propTypes.array.isRequired, // eslint-disable-line
  sendOrder: propTypes.func.isRequired,
}

Checkout.defaultProps = {
  JwtToken: null,
}

const mapStateToProps = (state) => {
  const user = getUser(state)
  return {
    JwtToken: user.token,
    cartItems: getCartItems(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendOrder: (orderItems, JwtToken) => {
      dispatch(sendOrder(orderItems, JwtToken))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
