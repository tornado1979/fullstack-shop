import React from 'react'
import propTypes from 'prop-types'

import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

// import style from '../../hoc/style'

import './product.scss'

const Product = ({
  click, name, description, isItemOnBasket, path, productId,
}) => {
  return (
    <div className="product">
      <Icon>cart</Icon>
      <div className="product-img"><img alt="" src={path} /> </div>
      <div className="product-name">{name}</div>
      <div className="product-descr">{description}</div>
      <div className="add-to-cart">
        {!isItemOnBasket &&
        <Button
          onClick={() => click({ productId })}
        >Add
        </Button>}
        {isItemOnBasket &&
        <Button
          disabled
          onClick={() => click({ productId })}
        >it is in cart
        </Button>}
      </div>
    </div>
  )
}

Product.propTypes = {
  click: propTypes.func.isRequired,
  description: propTypes.string.isRequired,
  // hocProp: propTypes.string.isRequired,
  isItemOnBasket: propTypes.bool.isRequired,
  name: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
  productId: propTypes.string.isRequired,
}

export default Product
