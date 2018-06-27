import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'

import Product from '../../components/products/product'
import './home.scss'
import '../../components/products/product.scss'
import config from '../../clientConfig'

import { getProducts } from './selectors/home.selectors'
import { fetchProducts } from './actionCreators/home.actionCreators'
import { addItemToCart } from '../../container/cart/actionCreators/cart.actionCreators'
import { getOrderItems } from '../../globalSelectors/globalSelectors'

import {
  getMessage,
  isSnackBarOpen,
} from '../../components/snackbar/selectors/snackbar.selectors'

import WrapperSnackBar from '../../components/snackbar/snackbar'

const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class Home extends Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  addItem(val) { // eslint-disable-line
    this.props.addItemToCart(val)
  }

  checkItem(val) {
    const { orderItems } = this.props

    return orderItems.some(item => item.productId === val)

    /* const res = this.props.isItemOnCartt(val)()
    return res */
  }

  getAllProducts(products) {
    if (products.length > 0) {
      return products.map(product => {
        return (
          <Product
            click={this.addItem}
            description={product.description}
            isItemOnBasket={this.checkItem(product._id)}
            key={product._id}
            name={product.name}
            path={`${server}${product.path}`}
            productId={product._id}
          />
        )
      })
    }
    return false
  }

  render() {
    const {
      open,
      snackBarMessage,
      products,
    } = this.props

    return (
      <main>
        <div className="products-wrapper">
          {this.getAllProducts(products)}
          <WrapperSnackBar
            message={snackBarMessage}
            open={open}
          />
        </div>
      </main>
    )
  }
}

Home.propTypes = {
  addItemToCart: propTypes.func.isRequired,
  fetchProducts: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  orderItems: propTypes.array.isRequired, // eslint-disable-line
  products: propTypes.array.isRequired, // eslint-disable-line
  snackBarMessage: propTypes.string.isRequired,
}

const mapStateToProps = (state) => (
  {
    open: isSnackBarOpen(state),
    orderItems: getOrderItems(state),
    products: getProducts(state),
    snackBarMessage: getMessage(state),
  }
)

const mapDispatchToProps = dispatch => bindActionCreators({
  addItemToCart: (item) => addItemToCart(item),
  fetchProducts,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
