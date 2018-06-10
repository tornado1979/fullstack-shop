import React from 'react'
import propTypes from 'prop-types'

import './product.scss'
// import defaultProduct from '../../assets/img/default_product.png'

export const Product = ({ name, description, path }) => {
  return (
    <div className="product">
      <div className="product-img"><img alt="" src={path} /> </div>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  )
}

Product.propTypes = {
  description: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
}
