// jshint proto: false

import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router'

import {
  removeItemFromCart,
  updateCartItem,
} from './actionCreators/cart.actionCreators'

import { getOrderItems } from '../../globalSelectors/globalSelectors'

import { Select } from '../../components/select'
import { getUser } from '../../container/auth/selectors/auth.selectors'

import './cart.scss'
import emptyCart from '../../assets/img/empty-cart.png'

function getModalStyle() {
  const top = 10 // + rand()
  const right = 0 // + rand()

  return {
    right: `${right}%`,
    top: `${top}%`,
    transform: `translate(-${top}%, -${right}%)`,
  }
}

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    position: 'absolute',
    width: theme.spacing.unit * 60,
  },
})

class Cart extends React.Component {
  state = {
    open: false,
  }

  componentDidMount() {
    console.log('component did mount')
    console.log(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('next props', nextProps)
    console.log('next state', nextState)
    return true
  }

  componentWillUpdate() {
    console.log('component will update')
  }

  componentDidUpdate() {
    console.log('component did update')
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  redirect = (path) => {
    const {
      history,
    } = this.props

    // close cart modal
    this.handleClose()

    // redirect use to /checkout page
    history.push(path)
  }

  removeItemFromCart(id) {
    this.props.removeItemFromCart({ cartId: id }, this.props.JwtToken)
  }

  updateCartItem(item, event) {
    const newQuantity = event.target.value

    this.props.updateCartItem({
      ...item,
      quantity: newQuantity,
    })
  }

  render() {
    const {
      classes,
      orderItems,
    } = this.props

    let cartItems = []

    cartItems = orderItems
      .map(item =>
        (
          <li key={item._id}>
            <div className="item">{item.name}</div>
            <div className="total-price">10<Icon>euro_symbol</Icon></div>
            <div className="quantity">
              <Select
                quantity={item.quantity}
                update={(event) => this.updateCartItem(item, event)}
              />
            </div>
            <div className="remove">
              <Button onClick={() => this.removeItemFromCart(item._id)}>
                remove
              </Button>
            </div>
          </li>),
      )

    return (
      <div>
        <IconButton
          aria-label="Add to shopping cart"
          color="primary"
          onClick={this.handleOpen}
        >
          <ShoppingBasket />
        </IconButton>
        <Modal
          aria-describedby="simple-modal-description"
          aria-labelledby="simple-modal-title"
          onClose={this.handleClose}
          open={this.state.open}
        >
          <div className={classes.paper} style={getModalStyle()} >
            {cartItems.length > 0 &&
              <span style={{ textAlign: 'center' }}>
                <Typography id="modal-title" variant="title" >
                  Items in cart.
                </Typography>
                <Typography id="simple-modal-description" variant="subheading" >
                  you have added these products to the cart
                </Typography>
                <ul className="cart-items">
                  {cartItems}
                </ul>
                <div style={{ textAlign: 'right' }}>
                  <Button color="primary" onClick={(ev) => this.redirect('/checkout', ev)} variant="contained">Checkout</Button>
                </div>
              </span>}
            {cartItems.length === 0 &&
              <span style={{ textAlign: 'center' }}>
                <Typography id="modal-title" variant="title">
                  Your cart is empty.
                </Typography>
                <img alt="cart is empty" src={emptyCart} />
              </span>}
          </div>
        </Modal>
      </div>
    )
  }
}

Cart.propTypes = {
  JwtToken: propTypes.string,
  classes: propTypes.shape().isRequired,
  history: propTypes.shape().isRequired,
  orderItems: propTypes.array.isRequired, // eslint-disable-line
  removeItemFromCart: propTypes.func.isRequired,
  updateCartItem: propTypes.func.isRequired,
}

Cart.defaultProps = {
  JwtToken: null,
}

const mapStateToProps = (state) => {
  const user = getUser(state)
  return {
    JwtToken: user.token,
    orderItems: getOrderItems(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeItemFromCart: (item, JwtToken) => removeItemFromCart(item, JwtToken),
  updateCartItem: (updatedItem) => updateCartItem(updatedItem),
}, dispatch)


// We need an intermediary variable for handling the recursive nesting.
export const CartWrapped =
  connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Cart)))
