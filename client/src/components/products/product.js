import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'

import { isUserLogedIn } from '../../container/auth/selectors/auth.selectors'

// import style from '../../hoc/style'

import './product.scss'

class Product extends Component {
  getButton(isUserLoggedIn, click, productId, isItemOnBasket) {
    if (!isUserLoggedIn) {
      return <Link to="/login">Login to add </Link>
    } else if (isItemOnBasket) {
      return (
        <Button disabled onClick={() => click({ productId })}>
           it is in cart
        </Button>)
    }

    // if user is loged in and item is not on basket, then 'Add'
    return (
      <Button onClick={() => click({ productId })}>
        Add
      </Button>)
  }
  render() {
    const {
      click,
      name,
      description,
      isItemOnBasket,
      isUserLoggedIn,
      path,
      productId,
    } = this.props

    return (
      <div className="product">
        <Icon>cart</Icon>
        <div className="product-img"><img alt="" src={path} /> </div>
        <div className="product-name">{name}</div>
        <div className="product-descr">{description}</div>
        <div className="add-to-cart">
          {this.getButton(isUserLoggedIn, click, productId, isItemOnBasket)}
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  click: propTypes.func.isRequired,
  description: propTypes.string.isRequired,
  // hocProp: propTypes.string.isRequired,
  isItemOnBasket: propTypes.bool.isRequired,
  isUserLoggedIn: propTypes.bool.isRequired,
  name: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
  productId: propTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: isUserLogedIn(state),
  }
}
export default connect(mapStateToProps, null)(Product)
