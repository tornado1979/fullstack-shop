import React from 'react'
import propTypes from 'prop-types'
import config from '../../clientConfig'

import './product.scss'
// import defaultProduct from '../../assets/img/default_product.png'
const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

export const Product = ({ name, description, path }) => {
  return (
    <div className="product">
      <div className="product-img"><img alt="" src={`${server}${path}`} /> </div>
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
