import React from 'react'
import propTypes from 'prop-types'

import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

// import style from '../../hoc/style'

import './product.scss'

const Product = ({
  name, description, path,
}) => {
  return (
    <div className="product">
      <Icon>cart</Icon>
      <div className="product-img"><img alt="" src={path} /> </div>
      <div className="product-name">{name}</div>
      <div className="product-descr">{description}</div>
      <div className="add-to-cart"><Button>Add</Button></div>
    </div>
  )
}

Product.propTypes = {
  description: propTypes.string.isRequired,
  hocProp: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
}

export default Product
