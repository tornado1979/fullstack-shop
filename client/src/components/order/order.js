import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// material-ui
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

// global selector
import { getCart } from '../../globalSelectors/globalSelectors'

import { removeItemFromCart } from '../../container/cart/actionCreators/cart.actionCreators'
import { getUser } from '../../container/auth/selectors/auth.selectors'
import CustomButton from '../button/button'

import './order.scss'

class Order extends Component {
  removeItem(id) {
    this.props.removeItem({ cartId: id }, this.props.JwtToken)
  }

  createOrderItemsDom(orderItems) {
    const cartItems = orderItems
      .map(item =>
        (
          <tr key={item._id}>
            <td className="item">{item.name} <span>x{item.quantity}</span></td>
            <td className="total-price">10<Icon>euro_symbol</Icon></td>
            <td className="remove">
              <Button onClick={() => this.removeItem(item._id)}>
                remove
              </Button>
            </td>
          </tr>
        ),
      )
    return cartItems
  }

  render() {
    const {
      orderItems,
      handleSubmit,
    } = this.props
    const message = orderItems.length > 0 ? 'Submit Order' : 'cart is empty'
    return (
      <div className="order-wrapper">
        <div>
          <h2>Your Order</h2>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th width="80%"><h4>PRODUCT</h4></th>
                <th width="10%"><h4>TOTAL</h4></th>
                <th width="10%"><h4>REMOVE</h4></th>
              </tr>
            </thead>
            <tbody>
              {this.createOrderItemsDom(orderItems)}
              <tr>
                <td className="order-total">
                  <h4>TOTAL</h4>
                </td>
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td>
                  <CustomButton
                    disabled={!(orderItems.length > 0)}
                    handleClick={handleSubmit}
                    message={message}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Order.propTypes = {
  handleSubmit: propTypes.func.isRequired, // coming from checkout.js
  JwtToken: propTypes.string,
  orderItems: propTypes.array.isRequired, //eslint-disable-line
  removeItem: propTypes.func.isRequired,
}

Order.defaultProps = {
  JwtToken: null,
}

const mapStateToProps = (state) => {
  const user = getUser(state)
  return {
    JwtToken: user.token,
    orderItems: getCart(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  removeItem: (item, JwtToken) => removeItemFromCart(item, JwtToken),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Order)
